import { Component, OnInit } from "@angular/core";
import { MovieTagModel } from "../../models/movie-tag.model";
import { MovieTagService } from "../../services/movie-tag.service";
import { Id } from "../../models/id";
import { MatDialog } from "@angular/material/dialog";
import { DialogMovieTagComponent, IDialogMovieTagData } from "../dialog-movie-tag/dialog-movie-tag.component";
import { DialogTitle } from "../../utils/dialog-title";
import {
  DialogDeleteConfirmationComponent,
  IDialogDeleteConfirmationData
} from "../dialog-delete-confirmation/dialog-delete-confirmation.component";

@Component({
  selector: "app-administration-movie-tags",
  templateUrl: "./administration-movie-tags.component.html",
  styleUrls: ["./administration-movie-tags.component.scss"]
})
export class AdministrationMovieTagsComponent implements OnInit {
  public movieTags: MovieTagModel[] = [];
  public selectedItem: MovieTagModel;

  constructor(
    private movieTagService: MovieTagService,
    private dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {
    this.movieTags = await this.movieTagService.getMovieTags();
  }

  selectItem(item: MovieTagModel): void {
    this.selectedItem = item;
  }

  addItem(): void {
    const data: IDialogMovieTagData = {
      title: DialogTitle.Add,
    };
    const dialogRef = this.dialog.open(DialogMovieTagComponent, {data});

    dialogRef.afterClosed().subscribe(async response => {
        if (!!response) {
          await this.addMovieTag(response);
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

    dialogRef.afterClosed().subscribe(async response => {
        if (!!response) {
          await this.updateMovieTag(response);
        }
      }
    );
  }

  deleteItem(): void {
    const data: IDialogDeleteConfirmationData = {
      title: DialogTitle.Delete,
      text: `Вы уверены, что хотите удалить жанр фильма: ${this.selectedItem.name}`
    };
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent, {data, autoFocus: false});

    dialogRef.afterClosed().subscribe(async response => {
        if (!!response) {
          await this.deleteMovieTag(this.selectedItem.idMovieTag);
        }
      }
    );
  }

  async addMovieTag(data: MovieTagModel): Promise<void> {
    const movieTag = await this.movieTagService.addMovieTag(data);
    this.movieTags.push(movieTag);
  }

  async updateMovieTag(data: MovieTagModel): Promise<void> {
    await this.movieTagService.updateMovieTag(data);
    this.movieTags = await this.movieTagService.getMovieTags();
  }

  async deleteMovieTag(id: Id): Promise<void> {
    await this.movieTagService.deleteMovieTag(id);
    this.movieTags = this.movieTags.filter(movieTag => movieTag.idMovieTag !== id);
  }
}
