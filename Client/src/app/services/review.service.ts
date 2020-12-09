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
    private reviewDataService: ReviewDataService
  ) {
  }

  async getReviewsByIdMovie(idMovie: Id): Promise<ReviewModel[]> {
    try {
      return await this.reviewDataService.getReviewsByIdMovieRequest(idMovie);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async getReviewMoviesByIdUser(idUser: Id): Promise<MovieModel[]> {
    try {
      return await this.reviewDataService.getReviewMoviesByIdUserRequest(idUser);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async updateReview(data: ReviewModel): Promise<void> {
    try {
      await this.reviewDataService.update(data.idReview, data);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async addReview(data: ReviewModel): Promise<ReviewModel> {
    try {
      return await this.reviewDataService.add(data);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async deleteReview(id: Id): Promise<void> {
    try {
      await this.reviewDataService.delete(id);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }
}
