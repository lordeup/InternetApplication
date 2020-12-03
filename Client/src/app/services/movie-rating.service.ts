import { Injectable } from "@angular/core";
import { MovieRatingDataService } from "./data-services/movie-rating-data.service";
import { Id } from "../models/id";
import { MovieRatingModel } from "../models/movie-rating.model";
import { RatingModel } from "../models/rating.model";

@Injectable({
  providedIn: "root"
})
export class MovieRatingService {

  constructor(
    private movieRatingDataService: MovieRatingDataService,
  ) {
  }

  getRatingByIdMovie(id: Id): Promise<RatingModel> {
    return new Promise((resolve) => {
      this.movieRatingDataService.getRatingByIdMovieRequest(id).subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  getMovieRatingByIdUserAndIdMovie(idUser: Id, idMovie: Id): Promise<MovieRatingModel> {
    return new Promise((resolve) => {
      this.movieRatingDataService.getMovieRatingByIdUserAndIdMovieRequest(idUser, idMovie).subscribe(response => {
        resolve(response);
      }, () => {
        resolve();
      });
    });
  }

  updateMovieRating(data: MovieRatingModel): Promise<void> {
    return new Promise((resolve) => {
      this.movieRatingDataService.updateMovieRatingRequest(data).subscribe(() => {
        resolve();
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  addMovieRating(data: MovieRatingModel): Promise<MovieRatingModel> {
    return new Promise((resolve) => {
      this.movieRatingDataService.addMovieRatingRequest(data).subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  deleteMovieRating(id: Id): Promise<void> {
    return new Promise((resolve) => {
      this.movieRatingDataService.deleteMovieRatingRequest(id).subscribe(() => {
        resolve();
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }
}
