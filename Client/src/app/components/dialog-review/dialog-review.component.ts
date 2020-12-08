import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogTitle } from "../../models/dialog-title";
import { ReviewModel } from "../../models/review.model";

export interface IDialogReviewData {
  title: DialogTitle;
  review?: ReviewModel;
}

@Component({
  selector: "app-dialog-review",
  templateUrl: "./dialog-review.component.html",
  styleUrls: ["./dialog-review.component.scss"]
})
export class DialogReviewComponent implements OnInit {
  public formGroup: FormGroup;
  public title: string;

  constructor(
    private dialogRef: MatDialogRef<DialogReviewComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private dialogData: IDialogReviewData) {
  }

  ngOnInit(): void {
    const {review, title} = this.dialogData;
    this.formGroup = this.formBuilder.group({
      idUser: review?.idUser,
      idMovie: review?.idMovie,
      text: [review?.text || "", Validators.required],
    });
    this.title = title || "";
  }

  dataValidation(data: ReviewModel): ReviewModel {
    const {review} = this.dialogData;
    if (!!review?.idReview) {
      data.idReview = review?.idReview;
    }

    return data;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const data = new ReviewModel().deserialize(this.formGroup.value);
    this.dataValidation(data);
    this.dialogRef.close(data);
  }
}
