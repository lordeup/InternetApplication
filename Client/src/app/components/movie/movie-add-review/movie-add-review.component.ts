import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ReviewModel } from "../../../models/review.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReviewService } from "../../../services/review.service";
import { Id } from "../../../models/id";
import { Observable } from "rxjs";
import { REQUIRED_TITLE_ERROR } from "../../../const";

@Component({
  selector: "app-movie-add-review",
  templateUrl: "./movie-add-review.component.html",
  styleUrls: ["./movie-add-review.component.css"]
})
export class MovieAddReviewComponent implements OnInit {
  @Input() public idMovie: Id;
  @Input() public idUser: Id;
  @Input() public authorized$: Observable<boolean>;

  @Output() public changeEventData = new EventEmitter<ReviewModel>();

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      idUser: this.idUser,
      idMovie: this.idMovie,
      text: ["", Validators.required],
    });
  }

  clearText(): void {
    this.formGroup.get("text").reset();
  }

  getErrorText(): string {
    return this.formGroup.get("text").hasError("required") ? REQUIRED_TITLE_ERROR : "";
  }

  onSubmit(): void {
    const data = new ReviewModel().deserialize(this.formGroup.value);
    this.addReview(data);
  }

  addReview(data: ReviewModel): void {
    this.reviewService.addReview(data).subscribe(() => {
      this.changeEventData.emit();
      this.clearText();
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

}
