import { Injectable } from "@angular/core";
import { Id } from "../models/id";
import { MovieModel } from "../models/movie.model";
import { MovieDataService } from "./data-services/movie-data.service";
import { AppRoutingService } from "../routers/app-routing.service";
import { FilterMovieModel } from "../models/filter-movie.model";

@Injectable({
  providedIn: "root"
})
export class MovieService {

  constructor(
    private movieDataService: MovieDataService,
    private appRoutingService: AppRoutingService
  ) {
  }

  async getMovie(id: Id): Promise<MovieModel> {
    try {
      return await this.movieDataService.getById(id);
    } catch (e) {
      alert(e.error?.message || e.message);
      this.appRoutingService.goToHomePage();
    }
  }

  async getMovies(): Promise<MovieModel[]> {
    try {
      return await this.movieDataService.getAll();
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async updateMovie(data: MovieModel): Promise<void> {
    try {
      await this.movieDataService.update(data.idMovie, data);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async addMovie(data: MovieModel): Promise<MovieModel> {
    try {
      return await this.movieDataService.add(data);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async filterMovie(data: Partial<FilterMovieModel>): Promise<MovieModel[]> {
    try {
      return await this.movieDataService.filterMovieRequest(data);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async deleteMovie(id: Id): Promise<void> {
    try {
      await this.movieDataService.delete(id);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }
}
