import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { AppRoutingService } from "../../routers/app-routing.service";
import { MovieModel } from "../../models/movie.model";
import { Id } from "../../models/id";
import { FileManagerService } from "../../services/file-manager.service";

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

  ngOnInit(): void {
    this.getMovies();
  }

  onClickMovie(id: Id): void {
    this.appRoutingService.goToMoviePage(id);
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(response => {
      this.movies = response;
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  getFile(fileName: string): void {
    this.fileManagerService.getFile(fileName).subscribe(response => {
      console.log("response", response);
    }, error => {
      console.log("error", error.error?.message || error.message);
      // alert(error.error?.message || error.message);
    });
  }

}
