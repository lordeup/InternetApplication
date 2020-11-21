import { Component, Input, OnInit } from "@angular/core";
import { MovieRatingService } from "../../../services/movie-rating.service";
import { Id } from "../../../models/id";
import { Observable } from "rxjs";
import { MovieRatingModel } from "../../../models/movie-rating.model";

@Component({
  selector: "app-movie-rating",
  templateUrl: "./movie-rating.component.html",
  styleUrls: ["./movie-rating.component.css"]
})
export class MovieRatingComponent implements OnInit {
  @Input() public idMovie: Id;
  @Input() public idUser: Id;
  @Input() public authorized$: Observable<boolean>;
  public movieRatingCount: number;
  public movieRatingByIdUserAndIdMovie: MovieRatingModel;

  constructor(
    private movieRatingService: MovieRatingService) {
  }

  ngOnInit(): void {
    this.getRatingByIdMovie(this.idMovie);
    this.getMovieRatingByIdUserAndIdMovie(this.idUser, this.idMovie);
  }

  onRatingChanged(rating: number): void {
    const model: Partial<MovieRatingModel> = {
      idMovie: this.idMovie,
      idUser: this.idUser,
      rating,
    };

    const data = new MovieRatingModel().deserialize(model);

    if (this.movieRatingByIdUserAndIdMovie == null) {
      this.addMovieRating(data);
    } else if (this.movieRatingByIdUserAndIdMovie.rating !== rating) {
      data.idMovieRating = this.movieRatingByIdUserAndIdMovie.idMovieRating;
      this.updateMovieRating(data);
    }
  }

  getRatingByIdMovie(id: Id): void {
    this.movieRatingService.getRatingByIdMovie(id).subscribe(response => {
      this.movieRatingCount = response.rating;
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  getMovieRatingByIdUserAndIdMovie(idUser: Id, idMovie: Id): void {
    this.movieRatingService.getMovieRatingByIdUserAndIdMovie(idUser, idMovie).subscribe(response => {
      this.movieRatingByIdUserAndIdMovie = response;
    }, () => {
      this.movieRatingByIdUserAndIdMovie = null;
    });
  }

  updateMovieRating(data: MovieRatingModel): void {
    this.movieRatingService.updateMovieRating(data).subscribe(() => {
      this.getRatingByIdMovie(this.idMovie);
      this.movieRatingByIdUserAndIdMovie = data;
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  addMovieRating(data: MovieRatingModel): void {
    this.movieRatingService.addMovieRating(data).subscribe(response => {
      this.getRatingByIdMovie(response.idMovie);
      this.getMovieRatingByIdUserAndIdMovie(this.idUser, this.idMovie);
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

}
