import { Component, OnInit } from "@angular/core";
import { MovieService } from "../../services/movie.service";
import { AppRoutingService } from "../../routers/app-routing.service";
import { MovieModel } from "../../models/movie.model";
import { Id } from "../../models/id";
import { FileManagerService } from "../../services/file-manager.service";
import { UNKNOWN_MOVIE_IMAGE } from "../../const";
import { MovieTagService } from "../../services/movie-tag.service";
import { MovieTagModel } from "../../models/movie-tag.model";
import { CollectionMovieTagModel } from "../../models/collection-movie-tag-.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  public movies: MovieModel[] = [];
  public allMovieTags: MovieTagModel[] = [];

  constructor(
    private movieService: MovieService,
    private movieTagService: MovieTagService,
    private fileManagerService: FileManagerService,
    private appRoutingService: AppRoutingService,
    ) {
  }

  async ngOnInit(): Promise<void> {
    this.movies = await this.movieService.getMovies();
    this.allMovieTags = await this.movieTagService.getMovieTags();
  }

  onClickMovie(id: Id): void {
    this.appRoutingService.goToMoviePage(id);
  }

  getFilePath(fileName: string): string {
    return !!fileName ? this.fileManagerService.getFilePath(fileName) : UNKNOWN_MOVIE_IMAGE;
  }

  async onChangeUseFilterData(collectionMovieTag: CollectionMovieTagModel): Promise<void> {
    this.movies = await this.movieService.findMoviesByMovieTags(collectionMovieTag);
  }

  async onChangeClearFilterData(): Promise<void> {
    this.movies = await this.movieService.getMovies();
  }
}
