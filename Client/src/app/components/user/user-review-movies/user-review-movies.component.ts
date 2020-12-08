import { Component, Input, OnInit } from "@angular/core";
import { MovieModel } from "../../../models/movie.model";
import { ReviewService } from "../../../services/review.service";
import { AppRoutingService } from "../../../routers/app-routing.service";
import { Id } from "../../../models/id";
import { FileManagerService } from "../../../services/file-manager.service";
import { UNKNOWN_MOVIE_IMAGE } from "../../../const";


@Component({
  selector: "app-user-review-movies",
  templateUrl: "./user-review-movies.component.html",
  styleUrls: ["./user-review-movies.component.scss"]
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
    this.reviewMovies = !!this.idUser && await this.reviewService.getReviewMoviesByIdUser(this.idUser);
  }

  onClickMovie(id: Id): void {
    this.appRoutingService.goToMoviePage(id);
  }

  getFilePath(fileName: string): string {
    return !!fileName ? this.fileManagerService.getFilePath(fileName) : UNKNOWN_MOVIE_IMAGE;
  }
}
