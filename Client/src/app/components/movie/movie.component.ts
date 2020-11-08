import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { AppRoutingService } from "../../routers/app-routing.service";
import { Movie } from "../../models/movie.model";
import { Id } from "../../models/id";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit {
  movie: Movie;

  constructor(
    private movieService: MovieService,
    private appRoutingService: AppRoutingService) {
  }

  ngOnInit(): void {
  }

  deleteMovie(id: Id): void {
    this.movieService.deleteMovie(id).subscribe(response => {
    }, error => {
      alert(error.error?.message || error.message);
    });
  }
}
