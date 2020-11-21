import { Component, Input, OnInit } from "@angular/core";
import { MovieModel } from "../../../models/movie.model";
import { ReviewService } from "../../../services/review.service";
import { AppRoutingService } from "../../../routers/app-routing.service";
import { Id } from "../../../models/id";

@Component({
  selector: "app-user-review-movies",
  templateUrl: "./user-review-movies.component.html",
  styleUrls: ["./user-review-movies.component.css"]
})
export class UserReviewMoviesComponent implements OnInit {
  @Input() public idUser: Id;
  public reviewMovies: MovieModel[] = [];

  constructor(
    private reviewService: ReviewService,
    private appRoutingService: AppRoutingService) {
  }

  ngOnInit(): void {
    this.getReviewMoviesByIdUser(this.idUser);
  }

  onClickMovie(id: Id): void {
    this.appRoutingService.goToMoviePage(id);
  }

  getReviewMoviesByIdUser(id: Id): void {
    this.reviewService.getReviewMoviesByIdUser(id).subscribe(response => {
      this.reviewMovies = response;
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

}
