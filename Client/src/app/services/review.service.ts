import { Injectable } from "@angular/core";
import { Id } from "../models/id";
import { ReviewModel } from "../models/review.model";
import { MovieModel } from "../models/movie.model";
import { ReviewDataService } from "./data-services/review-data.service";

@Injectable({
  providedIn: "root"
})
export class ReviewService {

  constructor(
    private reviewDataService: ReviewDataService,
  ) {
  }

  getReviewsByIdMovie(idMovie: Id): Promise<ReviewModel[]> {
    return new Promise((resolve) => {
      this.reviewDataService.getReviewsByIdMovieRequest(idMovie).subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  getReviewMoviesByIdUser(idUser: Id): Promise<MovieModel[]> {
    return new Promise((resolve) => {
      this.reviewDataService.getReviewMoviesByIdUserRequest(idUser).subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  updateReview(data: ReviewModel): Promise<void> {
    return new Promise((resolve) => {
      this.reviewDataService.updateReviewRequest(data).subscribe(() => {
        resolve();
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  addReview(data: ReviewModel): Promise<ReviewModel> {
    return new Promise((resolve) => {
      this.reviewDataService.addReviewRequest(data).subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  deleteReview(id: Id): Promise<void> {
    return new Promise((resolve) => {
      this.reviewDataService.deleteReviewRequest(id).subscribe(() => {
        resolve();
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }
}
