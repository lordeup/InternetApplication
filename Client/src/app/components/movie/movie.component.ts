import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { MovieModel } from "../../models/movie.model";
import { ActivatedRoute } from "@angular/router";
import { Id } from "../../models/id";
import { ReviewService } from "../../services/review.service";
import { ReviewModel } from "../../models/review.model";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";
import { FileManagerService } from "../../services/file-manager.service";
import { UserModel } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { UNKNOWN_MOVIE_IMAGE } from "../../const";
import { LocalStorageUtils } from "../../utils/local-storage-utils";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.scss"]
})
export class MovieComponent implements OnInit {
  public movie: MovieModel;
  public reviews: ReviewModel[] = [];
  public idMovie: Id;
  public idUser: Id;
  public currentUser: UserModel;
  public authorized$: Observable<boolean>;

  constructor(
    private movieService: MovieService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private userService: UserService,
    private localStorageUtils: LocalStorageUtils,
    private fileManagerService: FileManagerService,
    private activatedRoute: ActivatedRoute) {
  }

  async ngOnInit(): Promise<void> {
    this.authorized$ = this.authService.getAuthorized();
    this.idUser = this.localStorageUtils.getIdUser();
    this.idMovie = this.activatedRoute.snapshot.params.id;

    this.currentUser = !!this.idUser && await this.userService.getUser(this.idUser);

    if (!!this.idMovie) {
      this.movie = await this.movieService.getMovie(this.idMovie);
      this.reviews = await this.reviewService.getReviewsByIdMovie(this.idMovie);
    }
  }

  async onChangeReviewData(): Promise<void> {
    this.reviews = await this.reviewService.getReviewsByIdMovie(this.idMovie);
  }

  getFilePath(fileName: string): string {
    return !!fileName ? this.fileManagerService.getFilePath(fileName) : UNKNOWN_MOVIE_IMAGE;
  }

  onDeleteReview(id: Id): void {
    this.reviews = this.reviews.filter(b => b.idReview !== id);
  }

  isUserTypeAdmin(): boolean {
    return this.authService.isUserTypeAdmin();
  }
}
