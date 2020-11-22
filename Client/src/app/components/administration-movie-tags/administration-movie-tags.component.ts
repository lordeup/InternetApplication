import { Component, OnInit } from "@angular/core";
import { MovieTagModel } from "../../models/movie-tag.model";
import { MovieTagService } from "../../services/movie-tag.service";
import { Id } from "../../models/id";
import { MatDialog } from "@angular/material/dialog";
import { DialogMovieTagComponent, IDialogMovieTagData } from "../dialog-movie-tag/dialog-movie-tag.component";
import { DialogTitle } from "../../models/dialog-title";
import {
  DialogDeleteConfirmationComponent,
  IDialogDeleteConfirmationData
} from "../dialog-delete-confirmation/dialog-delete-confirmation.component";

@Component({
  selector: "app-administration-movie-tags",
  templateUrl: "./administration-movie-tags.component.html",
  styleUrls: ["./administration-movie-tags.component.css"]
})
export class AdministrationMovieTagsComponent implements OnInit {
  public movieTags: MovieTagModel[] = [];
  public selectedItem: MovieTagModel;

  constructor(
    private movieTagService: MovieTagService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getMovieTags();
  }

  addItem(): void {
    const data: IDialogMovieTagData = {
      title: DialogTitle.Add,
    };
    const dialogRef = this.dialog.open(DialogMovieTagComponent, {data});

    dialogRef.afterClosed().subscribe(response => {
        if (!!response) {
          this.addMovieTag(response);
        }
      }
    );
  }

  updateItem(): void {
    const data: IDialogMovieTagData = {
      title: DialogTitle.Edit,
      movieTag: this.selectedItem,
    };
    const dialogRef = this.dialog.open(DialogMovieTagComponent, {data});

    dialogRef.afterClosed().subscribe(response => {
        if (!!response) {
          this.updateMovieTag(response);
        }
      }
    );
  }

  selectItem(item: MovieTagModel): void {
    this.selectedItem = item;
  }

  deleteItem(): void {
    const data: IDialogDeleteConfirmationData = {
      title: DialogTitle.Delete,
      text: `Вы уверены, что хотите удалить жанр фильма: ${this.selectedItem.name}`
    };
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent, {data, autoFocus: false});

    dialogRef.afterClosed().subscribe(response => {
        if (!!response) {
          this.deleteMovieTag(this.selectedItem.idMovieTag);
        }
      }
    );
  }

  getMovieTags(): void {
    this.movieTagService.getMovieTags().subscribe(response => {
      this.movieTags = response;
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  updateMovieTag(data: MovieTagModel): void {
    this.movieTagService.updateMovieTag(data).subscribe(() => {
      this.getMovieTags();
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  addMovieTag(data: MovieTagModel): void {
    this.movieTagService.addMovieTag(data).subscribe(response => {
      this.movieTags.push(response);
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  deleteMovieTag(id: Id): void {
    this.movieTagService.deleteMovieTag(id).subscribe(() => {
      this.movieTags = this.movieTags.filter(movieTag => movieTag.idMovieTag !== id);
    }, error => {
      alert(error.error?.message || error.message);
    });
  }
}
