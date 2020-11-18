import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { MovieModel } from "../../models/movie.model";
import { ActivatedRoute } from "@angular/router";
import { Id } from "../../models/id";
import { ReviewService } from "../../services/review.service";
import { ReviewModel } from "../../models/review.model";
import { MovieRatingService } from "../../services/movie-rating.service";
import { AppRoutingService } from "../../routers/app-routing.service";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit {
  movie: MovieModel;
  reviewModels: ReviewModel[] = [];
  movieRatingCount: number;

  constructor(
    private movieService: MovieService,
    private movieRatingService: MovieRatingService,
    private reviewService: ReviewService,
    private appRoutingService: AppRoutingService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const movieId: Id = this.activatedRoute.snapshot.params.id;
    this.getMovie(movieId);
  }

  getMovie(id: Id): void {
    this.movieService.getMovie(id).subscribe(response => {
      console.log("getMovie", response);
      this.movie = response;
      this.getReviewsByIdMovie(id);
      this.getRatingByIdMovie(id);
    }, error => {
      alert(error.error?.message || error.message);
      this.appRoutingService.goToHomePage();
    });
  }

  getReviewsByIdMovie(id: Id): void {
    this.reviewService.getReviewsByIdMovie(id).subscribe(response => {
      console.log("getReviewsByIdMovie", response);
      this.reviewModels = response;
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  getRatingByIdMovie(id: Id): void {
    this.movieRatingService.getRatingByIdMovie(id).subscribe(response => {
      console.log("getRatingByIdMovie", response);
      this.movieRatingCount = response;
    }, error => {
      alert(error.error?.message || error.message);
    });
  }
}
