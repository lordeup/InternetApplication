import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../app-injection-tokens";
import { ApiRouting } from "../routers/api-routing.module";
import { Id } from "../models/id";
import { Observable } from "rxjs";
import { MovieTagModel } from "../models/movie-tag.model";

@Injectable({
  providedIn: "root"
})
export class MovieTagService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
  ) {
  }

  private baseUrlMovieTag = this.apiUrl + ApiRouting.MovieTag;

  getMovieTags(): Observable<MovieTagModel[]> {
    return this.http.get<MovieTagModel[]>(this.baseUrlMovieTag);
  }

  getMovieTag(id: Id): Observable<MovieTagModel> {
    const url = `${this.baseUrlMovieTag}/${id}`;
    return this.http.get<MovieTagModel>(url);
  }

  updateMovieTag(data: MovieTagModel): Observable<boolean> {
    const url = `${this.baseUrlMovieTag}/${data.idMovieTag}`;
    return this.http.patch<boolean>(url, data);
  }

  addMovieTag(data: MovieTagModel): Observable<MovieTagModel> {
    return this.http.post<MovieTagModel>(this.baseUrlMovieTag, data);
  }

  deleteMovieTag(id: Id): Observable<boolean> {
    const url = `${this.baseUrlMovieTag}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
