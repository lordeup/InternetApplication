import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../app-injection-tokens";
import { ApiRouting } from "../routers/api-routing.module";
import { Id } from "../models/id";
import { Observable } from "rxjs";
import { MovieRatingModel } from "../models/movie-rating.model";

@Injectable({
  providedIn: "root"
})
export class MovieRatingService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
  ) {
  }

  private baseUrlMovieRating = this.apiUrl + ApiRouting.MovieRating;

  getMovieRatings(): Observable<MovieRatingModel[]> {
    return this.http.get<MovieRatingModel[]>(this.baseUrlMovieRating);
  }

  getMovieRating(id: Id): Observable<MovieRatingModel> {
    const url = `${this.baseUrlMovieRating}/${id}`;
    return this.http.get<MovieRatingModel>(url);
  }

  getMovieRatingsByIdUser(id: Id): Observable<MovieRatingModel[]> {
    const url = `${this.baseUrlMovieRating}/user/${id}`;
    return this.http.get<MovieRatingModel[]>(url);
  }

  getMovieRatingsByIdMovie(id: Id): Observable<MovieRatingModel[]> {
    const url = `${this.baseUrlMovieRating}/movie/${id}`;
    return this.http.get<MovieRatingModel[]>(url);
  }

  getRatingByIdMovie(id: Id): Observable<number> {
    const url = `${this.baseUrlMovieRating}/rating/${id}`;
    return this.http.get<number>(url);
  }

  updateMovieRating(data: MovieRatingModel): Observable<boolean> {
    const url = `${this.baseUrlMovieRating}/${data.idMovieRating}`;
    return this.http.patch<boolean>(url, data);
  }

  addMovieRating(data: MovieRatingModel): Observable<MovieRatingModel> {
    return this.http.post<MovieRatingModel>(this.baseUrlMovieRating, data);
  }

  deleteMovieRating(id: Id): Observable<boolean> {
    const url = `${this.baseUrlMovieRating}/${id}`;
    return this.http.delete<boolean>(url);
  }
}