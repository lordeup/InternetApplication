import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { Id } from "../../models/id";
import { MatDialog } from "@angular/material/dialog";
import { DialogTitle } from "../../utils/dialog-title";
import {
  DialogDeleteConfirmationComponent,
  IDialogDeleteConfirmationData
} from "../dialog-delete-confirmation/dialog-delete-confirmation.component";
import { DialogMovieComponent, IDialogMovieData, IDialogMovieResponse } from "../dialog-movie/dialog-movie.component";
import { MovieModel } from "../../models/movie.model";
import { MovieTagService } from "../../services/movie-tag.service";
import { MovieTagModel } from "../../models/movie-tag.model";
import { FileManagerService } from "../../services/file-manager.service";

@Component({
  selector: "app-administration-movies",
  templateUrl: "./administration-movies.component.html",
  styleUrls: ["./administration-movies.component.scss"]
})
export class AdministrationMoviesComponent implements OnInit {
  public movies: MovieModel[] = [];
  public movieTags: MovieTagModel[] = [];
  public selectedItem: MovieModel;

  constructor(
    private movieService: MovieService,
    private movieTagService: MovieTagService,
    private fileManagerService: FileManagerService,
    private dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {
    this.movies = await this.movieService.getMovies();
    this.movieTags = await this.movieTagService.getMovieTags();
  }

  selectItem(item: MovieModel): void {
    this.selectedItem = item;
  }

  addItem(): void {
    const data: IDialogMovieData = {
      title: DialogTitle.Add,
      movieTags: this.movieTags,
    };
    const dialogRef = this.dialog.open(DialogMovieComponent, {data, autoFocus: false});

    dialogRef.afterClosed().subscribe(async (response: IDialogMovieResponse) => {
        if (!!response) {
          await this.addMovie(response);
        }
      }
    );
  }

  updateItem(): void {
    const data: IDialogMovieData = {
      title: DialogTitle.Edit,
      movieTags: this.movieTags,
      movie: this.selectedItem,
    };
    const dialogRef = this.dialog.open(DialogMovieComponent, {data, autoFocus: false});

    dialogRef.afterClosed().subscribe(async (response: IDialogMovieResponse) => {
        if (!!response) {
          await this.updateMovie(response);
        }
      }
    );
  }

  deleteItem(): void {
    const data: IDialogDeleteConfirmationData = {
      title: DialogTitle.Delete,
      text: `Вы уверены, что хотите удалить фильм: ${this.selectedItem.name}`
    };
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent, {data, autoFocus: false});

    dialogRef.afterClosed().subscribe(async response => {
        if (!!response) {
          await this.deleteMovie(this.selectedItem.idMovie);
        }
      }
    );
  }

  async addMovie(response: IDialogMovieResponse): Promise<void> {
    const file = response?.file;

    if (!!file) {
      const fileModel = await this.fileManagerService.uploadFile(file);
      response.movie.pictureUrl = fileModel.path;
    }
    if (!!response?.movie) {
      const movie = await this.movieService.addMovie(response.movie);
      this.movies.push(movie);
    }
  }

  async updateMovie(response: IDialogMovieResponse): Promise<void> {
    const pictureUrl = response?.movie?.pictureUrl;
    const file = response?.file;

    if (!!file) {
      const fileModel = !!pictureUrl
        ? await this.fileManagerService.updateFile(pictureUrl, file)
        : await this.fileManagerService.uploadFile(file);
      response.movie.pictureUrl = fileModel.path;
    } else if (!!response?.isDeletePicture && !!pictureUrl) {
      await this.fileManagerService.deleteFile(pictureUrl);
      response.movie.pictureUrl = "";
    }

    if (!!response?.movie) {
      await this.movieService.updateMovie(response.movie);
      this.movies = await this.movieService.getMovies();
    }
  }

  async deleteMovie(id: Id): Promise<void> {
    await this.movieService.deleteMovie(id);
    this.movies = this.movies.filter(movie => movie.idMovie !== id);
  }
}
