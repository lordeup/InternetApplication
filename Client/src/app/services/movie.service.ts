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
    private appRoutingService: AppRoutingService,
  ) {
  }

  getMovie(id: Id): Promise<MovieModel> {
    return new Promise((resolve) => {
      this.movieDataService.getMovieRequest(id).subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
        this.appRoutingService.goToHomePage();
      });
    });
  }

  getMovies(): Promise<MovieModel[]> {
    return new Promise((resolve) => {
      this.movieDataService.getMoviesRequest().subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  updateMovie(data: MovieModel): Promise<void> {
    return new Promise((resolve) => {
      this.movieDataService.updateMovieRequest(data).subscribe(() => {
        resolve();
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  addMovie(data: MovieModel): Promise<MovieModel> {
    return new Promise((resolve) => {
      this.movieDataService.addMovieRequest(data).subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  filterMovie(data: Partial<FilterMovieModel>): Promise<MovieModel[]> {
    return new Promise((resolve) => {
      this.movieDataService.filterMovieRequest(data).subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  deleteMovie(id: Id): Promise<void> {
    return new Promise((resolve) => {
      this.movieDataService.deleteMovieRequest(id).subscribe(() => {
        resolve();
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }
}
