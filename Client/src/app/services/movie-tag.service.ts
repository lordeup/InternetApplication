import { Injectable } from "@angular/core";
import { Id } from "../models/id";
import { MovieTagModel } from "../models/movie-tag.model";
import { MovieTagDataService } from "./data-services/movie-tag-data.service";

@Injectable({
  providedIn: "root"
})
export class MovieTagService {

  constructor(
    private movieTagDataService: MovieTagDataService
  ) {
  }

  async getMovieTags(): Promise<MovieTagModel[]> {
    try {
      return await this.movieTagDataService.getAll();
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async updateMovieTag(data: MovieTagModel): Promise<void> {
    try {
       await this.movieTagDataService.update(data.idMovieTag, data);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async addMovieTag(data: MovieTagModel): Promise<MovieTagModel> {
    try {
      return await this.movieTagDataService.add(data);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async deleteMovieTag(id: Id): Promise<void> {
    try {
      await this.movieTagDataService.delete(id);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }
}
