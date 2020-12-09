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
    private movieRatingDataService: MovieRatingDataService
  ) {
  }

  async getRatingByIdMovie(id: Id): Promise<RatingModel> {
    try {
      return await this.movieRatingDataService.getRatingByIdMovieRequest(id);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async getMovieRatingByIdUserAndIdMovie(idUser: Id, idMovie: Id): Promise<MovieRatingModel> {
    try {
      return await this.movieRatingDataService.getMovieRatingByIdUserAndIdMovieRequest(idUser, idMovie);
    } catch (e) {
      console.error(e.error?.message || e.message);
    }
  }

  async updateMovieRating(data: MovieRatingModel): Promise<void> {
    try {
      await this.movieRatingDataService.update(data.idMovieRating, data);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async addMovieRating(data: MovieRatingModel): Promise<MovieRatingModel> {
    try {
      return await this.movieRatingDataService.add(data);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async deleteMovieRating(id: Id): Promise<void> {
    try {
      await this.movieRatingDataService.delete(id);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }
}
