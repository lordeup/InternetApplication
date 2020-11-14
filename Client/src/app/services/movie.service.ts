import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../app-injection-tokens";
import { ApiRouting } from "../routers/api-routing.module";
import { Id } from "../models/id";
import { Observable } from "rxjs";
import { MovieModel } from "../models/movie.model";

@Injectable({
  providedIn: "root"
})
export class MovieService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
  ) {
  }

  private baseUrlMovie = this.apiUrl + ApiRouting.Movie;

  getMovies(): Observable<MovieModel[]> {
    return this.http.get<MovieModel[]>(this.baseUrlMovie);
  }

  getMovie(id: Id): Observable<MovieModel> {
    const url = `${this.baseUrlMovie}/${id}`;
    return this.http.get<MovieModel>(url);
  }

  updateMovie(data: MovieModel): Observable<boolean> {
    const url = `${this.baseUrlMovie}/${data.idMovie}`;
    return this.http.patch<boolean>(url, data);
  }

  addMovie(data: MovieModel): Observable<MovieModel> {
    return this.http.post<MovieModel>(this.baseUrlMovie, data);
  }

  deleteMovie(id: Id): Observable<boolean> {
    const url = `${this.baseUrlMovie}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
