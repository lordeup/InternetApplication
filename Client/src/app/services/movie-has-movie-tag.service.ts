import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../app-injection-tokens";
import { ApiRouting } from "../routers/api-routing.module";
import { Id } from "../models/id";
import { Observable } from "rxjs";
import { MovieHasMovieTagModel } from "../models/movie-has-movie-tag.model";

@Injectable({
  providedIn: "root"
})
export class MovieHasMovieTagService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
  ) {
  }

  private baseUrlMovieHasMovieTag = this.apiUrl + ApiRouting.MovieHasMovieTag;

  getMovieHasMovieTags(): Observable<MovieHasMovieTagModel[]> {
    return this.http.get<MovieHasMovieTagModel[]>(this.baseUrlMovieHasMovieTag);
  }

  getMovieHasMovieTag(id: Id): Observable<MovieHasMovieTagModel> {
    const url = `${this.baseUrlMovieHasMovieTag}/${id}`;
    return this.http.get<MovieHasMovieTagModel>(url);
  }

  updateMovieHasMovieTag(data: MovieHasMovieTagModel): Observable<boolean> {
    const url = `${this.baseUrlMovieHasMovieTag}/${data.idMovieXMovieTag}`;
    return this.http.patch<boolean>(url, data);
  }

  addMovieHasMovieTag(data: MovieHasMovieTagModel): Observable<MovieHasMovieTagModel> {
    return this.http.post<MovieHasMovieTagModel>(this.baseUrlMovieHasMovieTag, data);
  }

  deleteMovieHasMovieTag(id: Id): Observable<boolean> {
    const url = `${this.baseUrlMovieHasMovieTag}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
