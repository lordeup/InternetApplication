import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { AppRoutingService } from "../../routers/app-routing.service";
import { MovieModel } from "../../models/movie.model";
import { Id } from "../../models/id";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  movies: MovieModel[] = [];

  constructor(
    private movieService: MovieService,
    private appRoutingService: AppRoutingService) {
  }

  ngOnInit(): void {
    this.getMovies();
  }

  onClickMovie(id: Id): void {
    this.appRoutingService.goToMoviePage(id);
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(response => {
      console.log("getMovies", response);
      this.movies = response;
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

}
