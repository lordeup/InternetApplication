import { Component, Inject, OnInit } from "@angular/core";
import { DialogTitle } from "../../models/dialog-title";
import { MovieModel } from "../../models/movie.model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { REQUIRED_TITLE_ERROR } from "../../const";
import { MovieTagModel } from "../../models/movie-tag.model";

export interface IDialogMovieData {
  title: DialogTitle;
  movieTags: MovieTagModel[];
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
  allMovieTags: MovieTagModel[] = [];

  constructor(
    private dialogRef: MatDialogRef<DialogMovieComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private dialogData: IDialogMovieData) {
  }

  ngOnInit(): void {
    const {movie, movieTags, title} = this.dialogData;
    this.formGroup = this.formBuilder.group({
      name: [movie?.name || "", Validators.required],
      description: movie?.description || "",
      movieTags: new FormControl(movie?.movieTags || []),
    });
    this.title = title || "";
    this.allMovieTags = movieTags;
  }

  compareByValue(a: MovieTagModel, b: MovieTagModel) {
    return a.idMovieTag === b.idMovieTag;
  }

  getErrorName(): string {
    return this.formGroup.get("name").hasError("required") ? REQUIRED_TITLE_ERROR : "";
  }

  dataValidation(data: MovieModel): MovieModel {
    const {movie} = this.dialogData;
    if (!!movie?.idMovie) {
      data.idMovie = movie?.idMovie;
    }

    return data;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const data = new MovieModel().deserialize(this.formGroup.value);
    this.dataValidation(data);
    this.dialogRef.close(data);
  }

}
