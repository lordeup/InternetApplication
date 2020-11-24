import { Injectable } from "@angular/core";
import { Id } from "../models/id";
import { MovieTagModel } from "../models/movie-tag.model";
import { MovieTagDataService } from "./data-services/movie-tag-data.service";

@Injectable({
  providedIn: "root"
})
export class MovieTagService {

  constructor(
    private movieTagDataService: MovieTagDataService,
  ) {
  }

  getMovieTags(): Promise<MovieTagModel[]> {
    return new Promise((resolve) => {
      this.movieTagDataService.getMovieTagsRequest().subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  updateMovieTag(data: MovieTagModel): Promise<void> {
    return new Promise((resolve) => {
      this.movieTagDataService.updateMovieTagRequest(data).subscribe(() => {
        resolve();
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  addMovieTag(data: MovieTagModel): Promise<MovieTagModel> {
    return new Promise((resolve) => {
      this.movieTagDataService.addMovieTagRequest(data).subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  deleteMovieTag(id: Id): Promise<void> {
    return new Promise((resolve) => {
      this.movieTagDataService.deleteMovieTagRequest(id).subscribe(() => {
        resolve();
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }
}
