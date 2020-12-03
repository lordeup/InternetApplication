import { Component, Input, OnInit } from "@angular/core";
import { MovieRatingService } from "../../../services/movie-rating.service";
import { Id } from "../../../models/id";
import { Observable } from "rxjs";
import { MovieRatingModel } from "../../../models/movie-rating.model";
import { RatingModel } from "../../../models/rating.model";

@Component({
  selector: "app-movie-rating",
  templateUrl: "./movie-rating.component.html",
  styleUrls: ["./movie-rating.component.css"]
})
export class MovieRatingComponent implements OnInit {
  @Input() public idMovie: Id;
  @Input() public idUser: Id;
  @Input() public authorized$: Observable<boolean>;
  public movieRating: RatingModel;
  public movieRatingByIdUser: MovieRatingModel;

  constructor(
    private movieRatingService: MovieRatingService) {
  }

  async ngOnInit(): Promise<void> {
    if (!!this.idMovie) {
      this.movieRating = await this.movieRatingService.getRatingByIdMovie(this.idMovie);
      this.movieRatingByIdUser = !!this.idUser &&
        await this.movieRatingService.getMovieRatingByIdUserAndIdMovie(this.idUser, this.idMovie);
    }
  }

  async onRatingChanged(rating: number): Promise<void> {
    const model: Partial<MovieRatingModel> = {
      idMovie: this.idMovie,
      idUser: this.idUser,
      rating,
    };

    const data = new MovieRatingModel().deserialize(model);

    if (this.movieRatingByIdUser == null) {
      await this.addMovieRating(data);
    } else if (this.movieRatingByIdUser.rating !== rating) {
      data.idMovieRating = this.movieRatingByIdUser.idMovieRating;
      await this.updateMovieRating(data);
    }
  }

  async updateMovieRating(data: MovieRatingModel): Promise<void> {
    await this.movieRatingService.updateMovieRating(data);
    this.movieRating = await this.movieRatingService.getRatingByIdMovie(this.idMovie);
    this.movieRatingByIdUser = data;
  }

  async addMovieRating(data: MovieRatingModel): Promise<void> {
    const ratingModel = await this.movieRatingService.addMovieRating(data);
    this.movieRating = await this.movieRatingService.getRatingByIdMovie(ratingModel.idMovie);
    this.movieRatingByIdUser = await this.movieRatingService.getMovieRatingByIdUserAndIdMovie(ratingModel.idUser, ratingModel.idMovie);
  }

  async onDeleteRating(id: Id): Promise<void> {
    await this.movieRatingService.deleteMovieRating(id);
    this.movieRating = await this.movieRatingService.getRatingByIdMovie(this.idMovie);
    this.movieRatingByIdUser = null;
  }
}
