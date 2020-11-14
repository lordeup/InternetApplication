import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MovieTagModel } from "../../models/movie-tag.model";
import { DialogTitle } from "../../models/dialog-title";

export interface IDialogMovieTagData {
  title: DialogTitle;
  movieTag?: MovieTagModel;
}

@Component({
  selector: "app-dialog-movie-tag",
  templateUrl: "./dialog-movie-tag.component.html",
  styleUrls: ["./dialog-movie-tag.component.css"]
})
export class DialogMovieTagComponent implements OnInit {
  formGroup: FormGroup;
  title: string;

  constructor(
    private dialogRef: MatDialogRef<DialogMovieTagComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: IDialogMovieTagData) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      idMovieTag: this.data.movieTag?.idMovieTag,
      name: this.data.movieTag?.name || "",
    });
    !this.formGroup.value.idMovieTag && this.formGroup.removeControl("idMovieTag");
    this.title = this.data.title || "";
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const data = new MovieTagModel().deserialize(this.formGroup.value);
    this.dialogRef.close(data);
  }

}
