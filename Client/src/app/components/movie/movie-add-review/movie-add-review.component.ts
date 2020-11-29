import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ReviewModel } from "../../../models/review.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReviewService } from "../../../services/review.service";
import { Id } from "../../../models/id";
import { Observable } from "rxjs";
import { UNKNOWN_USER_IMAGE } from "../../../const";
import { UserModel } from "../../../models/user.model";
import { FileManagerService } from "../../../services/file-manager.service";


@Component({
  selector: "app-movie-add-review",
  templateUrl: "./movie-add-review.component.html",
  styleUrls: ["./movie-add-review.component.css"]
})
export class MovieAddReviewComponent implements OnInit {
  @Input() public idMovie: Id;
  @Input() public user: UserModel;
  @Input() public authorized$: Observable<boolean>;

  @Output() public changeEventData = new EventEmitter<ReviewModel>();

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private fileManagerService: FileManagerService,
    private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      idUser: this.user.idUser,
      idMovie: this.idMovie,
      text: ["", Validators.required],
    });
  }

  clearText(): void {
    this.formGroup.get("text").reset();
  }

  getFilePath(fileName: string): string {
    return !!fileName ? this.fileManagerService.getFilePath(fileName) : UNKNOWN_USER_IMAGE;
  }

  async onSubmit(): Promise<void> {
    const data = new ReviewModel().deserialize(this.formGroup.value);
    await this.addReview(data);
  }

  async addReview(data: ReviewModel): Promise<void> {
    await this.reviewService.addReview(data);
    this.changeEventData.emit();
    this.clearText();
  }
}
