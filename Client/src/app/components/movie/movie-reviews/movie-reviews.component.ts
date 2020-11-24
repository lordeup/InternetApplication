import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ReviewService } from "../../../services/review.service";
import { ReviewModel } from "../../../models/review.model";
import { MatDialog } from "@angular/material/dialog";
import { DialogTitle } from "../../../models/dialog-title";
import {
  DialogDeleteConfirmationComponent,
  IDialogDeleteConfirmationData
} from "../../dialog-delete-confirmation/dialog-delete-confirmation.component";
import { Id } from "../../../models/id";
import { DialogReviewComponent, IDialogReviewData } from "../../dialog-review/dialog-review.component";

@Component({
  selector: "app-movie-reviews",
  templateUrl: "./movie-reviews.component.html",
  styleUrls: ["./movie-reviews.component.css"]
})
export class MovieReviewsComponent implements OnInit {
  @Input() public reviews: ReviewModel[];

  @Output() public deleteReviewEventData = new EventEmitter<Id>();
  @Output() public changeEventData = new EventEmitter();

  public selectedItem: ReviewModel;

  constructor(
    private reviewService: ReviewService,
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
}
