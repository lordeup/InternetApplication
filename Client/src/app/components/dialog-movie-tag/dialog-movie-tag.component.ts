import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MovieTagModel } from "../../models/movie-tag.model";
import { DialogTitle } from "../../utils/dialog-title";

export interface IDialogMovieTagData {
  title: DialogTitle;
  movieTag?: MovieTagModel;
}

@Component({
  selector: "app-dialog-movie-tag",
  templateUrl: "./dialog-movie-tag.component.html",
  styleUrls: ["./dialog-movie-tag.component.scss"]
})
export class DialogMovieTagComponent implements OnInit {
  public formGroup: FormGroup;
  public title: string;

  constructor(
    private dialogRef: MatDialogRef<DialogMovieTagComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private dialogData: IDialogMovieTagData) {
  }

  ngOnInit(): void {
    const {movieTag, title} = this.dialogData;
    this.formGroup = this.formBuilder.group({
      name: [movieTag?.name || "", Validators.required],
    });
    this.title = title || "";
  }

  dataValidation(data: MovieTagModel): MovieTagModel {
    const {movieTag} = this.dialogData;
    if (!!movieTag?.idMovieTag) {
      data.idMovieTag = movieTag?.idMovieTag;
    }

    return data;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const data = new MovieTagModel().deserialize(this.formGroup.value);
    this.dataValidation(data);
    this.dialogRef.close(data);
  }
}
