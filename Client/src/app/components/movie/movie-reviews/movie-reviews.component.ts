import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ReviewService } from "../../../services/review.service";
import { ReviewModel } from "../../../models/review.model";
import { MatDialog } from "@angular/material/dialog";
import { DialogTitle } from "../../../utils/dialog-title";
import {
  DialogDeleteConfirmationComponent,
  IDialogDeleteConfirmationData
} from "../../dialog-delete-confirmation/dialog-delete-confirmation.component";
import { Id } from "../../../models/id";
import { DialogReviewComponent, IDialogReviewData } from "../../dialog-review/dialog-review.component";
import { FileManagerService } from "../../../services/file-manager.service";
import { UNKNOWN_USER_IMAGE } from "../../../const";
import { Observable } from "rxjs";

@Component({
  selector: "app-movie-reviews",
  templateUrl: "./movie-reviews.component.html",
  styleUrls: ["./movie-reviews.component.scss"]
})
export class MovieReviewsComponent implements OnInit {
  @Input() public reviews: ReviewModel[];
  @Input() public authorized$: Observable<boolean>;
  @Input() public isUserTypeAdmin: boolean;
  @Input() public currentUserId: Id;

  @Output() public deleteReviewEventData = new EventEmitter<Id>();
  @Output() public changeEventData = new EventEmitter();

  public selectedItem: ReviewModel;

  constructor(
    private reviewService: ReviewService,
    private fileManagerService: FileManagerService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  selectItem(item: ReviewModel): void {
    this.selectedItem = item;
  }

  updateItem(): void {
    const data: IDialogReviewData = {
      title: DialogTitle.Edit,
      review: this.selectedItem,
    };
    const dialogRef = this.dialog.open(DialogReviewComponent, {data});

    dialogRef.afterClosed().subscribe(async response => {
        if (!!response) {
          await this.updateReview(response);
        }
      }
    );
  }

  deleteItem(): void {
    const data: IDialogDeleteConfirmationData = {
      title: DialogTitle.Delete,
      text: `Вы уверены, что хотите удалить данную рецензию`
    };
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent, {data, autoFocus: false});

    dialogRef.afterClosed().subscribe(async response => {
        if (!!response) {
          await this.deleteReview(this.selectedItem.idReview);
        }
      }
    );
  }

  async updateReview(data: ReviewModel): Promise<void> {
    await this.reviewService.updateReview(data);
    this.changeEventData.emit();
  }

  async deleteReview(id: Id): Promise<void> {
    await this.reviewService.deleteReview(id);
    this.deleteReviewEventData.emit(id);
  }

  getFilePath(fileName: string): string {
    return !!fileName ? this.fileManagerService.getFilePath(fileName) : UNKNOWN_USER_IMAGE;
  }

  isCheckAccess(item: ReviewModel): boolean {
    if (this.isUserTypeAdmin) {
      return true;
    }
    return item.user.idUser === this.currentUserId;
  }
}
