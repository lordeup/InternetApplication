import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app-injection-tokens";
import { ApiRouting } from "../../routers/api-routing.module";
import { Id } from "../../models/id";
import { MovieRatingModel } from "../../models/movie-rating.model";
import { RatingModel } from "../../models/rating.model";
import { BaseDataService } from "./base-data.service";

@Injectable({
  providedIn: "root"
})
export class MovieRatingDataService extends BaseDataService<MovieRatingModel> {

  constructor(
    protected http: HttpClient,
    @Inject(API_URL) protected apiUrl
  ) {
    super(http, apiUrl, ApiRouting.MovieRating);
  }

  getMovieRatingByIdUserAndIdMovieRequest(idUser: Id, idMovie: Id): Promise<MovieRatingModel> {
    const url = `${this.baseUrl}/user/${idUser}/movie/${idMovie}`;
    return this.http.get<MovieRatingModel>(url).toPromise();
  }

  getRatingByIdMovieRequest(id: Id): Promise<RatingModel> {
    const url = `${this.baseUrl}/rating/${id}`;
    return this.http.get<RatingModel>(url).toPromise();
  }
}
