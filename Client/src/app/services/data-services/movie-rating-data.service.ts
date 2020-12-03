import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app-injection-tokens";
import { ApiRouting } from "../../routers/api-routing.module";
import { Observable } from "rxjs";
import { Id } from "../../models/id";
import { MovieRatingModel } from "../../models/movie-rating.model";
import { RatingModel } from "../../models/rating.model";

@Injectable({
  providedIn: "root"
})
export class MovieRatingDataService {

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

  getMovieRatingByIdUserAndIdMovieRequest(idUser: Id, idMovie: Id): Observable<MovieRatingModel> {
    const url = `${this.baseUrlMovieRating}/user/${idUser}/movie/${idMovie}`;
    return this.http.get<MovieRatingModel>(url);
  }

  getRatingByIdMovieRequest(id: Id): Observable<RatingModel> {
    const url = `${this.baseUrlMovieRating}/rating/${id}`;
    return this.http.get<RatingModel>(url);
  }

  updateMovieRatingRequest(data: MovieRatingModel): Observable<boolean> {
    const url = `${this.baseUrlMovieRating}/${data.idMovieRating}`;
    return this.http.patch<boolean>(url, data);
  }

  addMovieRatingRequest(data: MovieRatingModel): Observable<MovieRatingModel> {
    return this.http.post<MovieRatingModel>(this.baseUrlMovieRating, data);
  }

  deleteMovieRatingRequest(id: Id): Observable<boolean> {
    const url = `${this.baseUrlMovieRating}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
