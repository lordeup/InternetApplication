import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { Id } from "../../models/id";
import { MatDialog } from "@angular/material/dialog";
import { DialogTitle } from "../../models/dialog-title";
import {
  DialogDeleteConfirmationComponent,
  IDialogDeleteConfirmationData
} from "../dialog-delete-confirmation/dialog-delete-confirmation.component";
import { DialogMovieComponent, IDialogMovieData } from "../dialog-movie/dialog-movie.component";
import { MovieModel } from "../../models/movie.model";

@Component({
  selector: "app-administration-movies",
  templateUrl: "./administration-movies.component.html",
  styleUrls: ["./administration-movies.component.css"]
})
export class AdministrationMoviesComponent implements OnInit {
  movies: MovieModel[] = [];
  selectedItem: MovieModel;

  constructor(
    private movieService: MovieService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getMovies();
  }

  addItem(): void {
    const data: IDialogMovieData = {
      title: DialogTitle.Add,
    };
    const dialogRef = this.dialog.open(DialogMovieComponent, {data});
    dialogRef.afterClosed().subscribe(
      response => {
        !!response && this.addMovie(response);
      }
    );
  }

  editItem(): void {
    const data: IDialogMovieData = {
      title: DialogTitle.Edit,
      movie: this.selectedItem,
    };
    const dialogRef = this.dialog.open(DialogMovieComponent, {data});
    dialogRef.afterClosed().subscribe(
      response => {
        !!response && this.updateMovie(response);
      }
    );
  }

  selectItem(item: MovieModel): void {
    this.selectedItem = item;
  }

  deleteItem(): void {
    const data: IDialogDeleteConfirmationData = {
      title: DialogTitle.Delete,
      text: `Вы уверены, что хотите удалить фильм: ${this.selectedItem.name}`
    };
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent, {data, autoFocus: false});
    dialogRef.afterClosed().subscribe(
      response => {
        !!response && this.deleteMovie(this.selectedItem.idMovie);
      }
    );
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(response => {
      console.log("getMovies", response);
      this.movies = response;
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  updateMovie(data: MovieModel): void {
    this.movieService.updateMovie(data).subscribe(response => {
      this.getMovies();
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  addMovie(data: MovieModel): void {
    this.movieService.addMovie(data).subscribe(response => {
      this.movies.push(response);
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  deleteMovie(id: Id): void {
    this.movieService.deleteMovie(id).subscribe(response => {
      this.getMovies();
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

}
