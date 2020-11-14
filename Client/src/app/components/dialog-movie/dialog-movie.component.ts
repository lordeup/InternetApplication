import { Component, Inject, OnInit } from "@angular/core";
import { DialogTitle } from "../../models/dialog-title";
import { MovieModel } from "../../models/movie.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface IDialogMovieData {
  title: DialogTitle;
  movie?: MovieModel;
}

@Component({
  selector: "app-dialog-movie",
  templateUrl: "./dialog-movie.component.html",
  styleUrls: ["./dialog-movie.component.css"]
})
export class DialogMovieComponent implements OnInit {
  formGroup: FormGroup;
  title: string;

  constructor(
    private dialogRef: MatDialogRef<DialogMovieComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: IDialogMovieData) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      idMovie: this.data.movie?.idMovie,
      name: this.data.movie?.name || "",
    });
    !this.formGroup.value.idMovie && this.formGroup.removeControl("idMovie");
    this.title = this.data.title || "";
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const data = new MovieModel().deserialize(this.formGroup.value);
    this.dialogRef.close(data);
  }

}
