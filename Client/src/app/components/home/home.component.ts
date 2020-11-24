import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { AppRoutingService } from "../../routers/app-routing.service";
import { MovieModel } from "../../models/movie.model";
import { Id } from "../../models/id";
import { FileManagerService } from "../../services/file-manager.service";

// const UNKNOWN_MOVIE_IMAGE = require("src/assets/unknown-movie.png");
const UNKNOWN_MOVIE_IMAGE = "assets/unknown-movie.png";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public movies: MovieModel[] = [];

  constructor(
    private movieService: MovieService,
    private fileManagerService: FileManagerService,
    private appRoutingService: AppRoutingService) {
  }

  async ngOnInit(): Promise<void> {
    this.movies = await this.movieService.getMovies();
  }

  onClickMovie(id: Id): void {
    this.appRoutingService.goToMoviePage(id);
  }

  getFilePath(fileName: string): string {
    return !!fileName ? this.fileManagerService.getFilePath(fileName) : UNKNOWN_MOVIE_IMAGE;
  }
}
