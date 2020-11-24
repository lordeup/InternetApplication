import { Component, Input, OnInit } from "@angular/core";
import { MovieModel } from "../../../models/movie.model";
import { ReviewService } from "../../../services/review.service";
import { AppRoutingService } from "../../../routers/app-routing.service";
import { Id } from "../../../models/id";
import { FileManagerService } from "../../../services/file-manager.service";

// const UNKNOWN_MOVIE_IMAGE = require("src/assets/unknown-movie.png");
const UNKNOWN_MOVIE_IMAGE = "assets/unknown-movie.png";

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
    private fileManagerService: FileManagerService,
    private appRoutingService: AppRoutingService) {
  }

  async ngOnInit(): Promise<void> {
    this.reviewMovies = await this.reviewService.getReviewMoviesByIdUser(this.idUser);
  }

  onClickMovie(id: Id): void {
    this.appRoutingService.goToMoviePage(id);
  }

  getFilePath(fileName: string): string {
    return !!fileName ? this.fileManagerService.getFilePath(fileName) : UNKNOWN_MOVIE_IMAGE;
  }
}
