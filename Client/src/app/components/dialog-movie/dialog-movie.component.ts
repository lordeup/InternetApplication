import { Component, Inject, OnInit } from "@angular/core";
import { DialogTitle } from "../../utils/dialog-title";
import { MovieModel } from "../../models/movie.model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MovieTagModel } from "../../models/movie-tag.model";
import { FileManagerService } from "../../services/file-manager.service";

export interface IDialogMovieData {
  title: DialogTitle;
  movieTags: MovieTagModel[];
  movie?: MovieModel;
}

export interface IDialogMovieResponse {
  movie: MovieModel;
  file?: File;
  isDeletePicture?: boolean;
}

@Component({
  selector: "app-dialog-movie",
  templateUrl: "./dialog-movie.component.html",
  styleUrls: ["./dialog-movie.component.scss"]
})
export class DialogMovieComponent implements OnInit {
  public formGroup: FormGroup;
  public title: string;
  public allMovieTags: MovieTagModel[] = [];
  public imageFile: File | undefined;
  public previewUrl: string;

  constructor(
    private dialogRef: MatDialogRef<DialogMovieComponent>,
    private formBuilder: FormBuilder,
    private fileManagerService: FileManagerService,
    @Inject(MAT_DIALOG_DATA) private dialogData: IDialogMovieData) {
  }

  ngOnInit(): void {
    const {movie, movieTags, title} = this.dialogData;
    this.formGroup = this.formBuilder.group({
      name: [movie?.name || "", Validators.required],
      description: movie?.description || "",
      pictureUrl: movie?.pictureUrl || "",
      movieTags: new FormControl(movie?.movieTags || []),
    });
    this.title = title || "";
    this.allMovieTags = movieTags;
    this.previewUrl = this.getFilePath(movie?.pictureUrl);
  }

  compareByValue(a: MovieTagModel, b: MovieTagModel): boolean {
    return a.idMovieTag === b.idMovieTag;
  }

  dataValidation(data: MovieModel): IDialogMovieResponse {
    const {movie} = this.dialogData;
    if (!!movie?.idMovie) {
      data.idMovie = movie?.idMovie;
    }

    const response: IDialogMovieResponse = {
      movie: data
    };

    if (!!movie?.pictureUrl && !this.imageFile && !this.previewUrl) {
      response.isDeletePicture = true;
    }

    if (!!this.imageFile) {
      response.file = this.imageFile;
    }

    return response;
  }

  setImageFile(file?: File): void {
    this.imageFile = file;
  }

  setPreviewUrl(value: string): void {
    this.previewUrl = value;
  }

  getFilePath(fileName: string): string {
    return !!fileName ? this.fileManagerService.getFilePath(fileName) : "";
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const data = new MovieModel().deserialize(this.formGroup.value);
    const response = this.dataValidation(data);
    this.dialogRef.close(response);
  }
}
