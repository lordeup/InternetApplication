import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { MovieModel } from "../../models/movie.model";
import { ActivatedRoute } from "@angular/router";
import { Id } from "../../models/id";
import { ReviewService } from "../../services/review.service";
import { ReviewModel } from "../../models/review.model";
import { AppRoutingService } from "../../routers/app-routing.service";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit {
  public movie: MovieModel;
  public reviews: ReviewModel[] = [];
  public idMovie: Id;
  public idUser: Id;
  public authorized$: Observable<boolean>;

  constructor(
    private movieService: MovieService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private appRoutingService: AppRoutingService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.authorized$ = this.authService.getAuthorized();
    this.idUser = this.authService.getIdUserFromLocalStorage();
    this.idMovie = this.activatedRoute.snapshot.params.id;

    this.getMovie(this.idMovie);
  }

  onChangeReviewData(): void {
    this.getReviewsByIdMovie(this.idMovie);
  }

  onDeleteReview(id: Id): void {
    this.reviews = this.reviews.filter(b => b.idReview !== id);
  }

  getMovie(id: Id): void {
    this.movieService.getMovie(id).subscribe(response => {
      console.log("getMovie", response);
      this.movie = response;
      this.getReviewsByIdMovie(id);
    }, error => {
      alert(error.error?.message || error.message);
      this.appRoutingService.goToHomePage();
    });
  }

  getReviewsByIdMovie(id: Id): void {
    this.reviewService.getReviewsByIdMovie(id).subscribe(response => {
      console.log("getReviewsByIdMovie", response);
      this.reviews = response;
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

}
