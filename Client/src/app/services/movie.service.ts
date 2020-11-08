import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../app-injection-tokens";
import { ApiRouting } from "../routers/api-routing.module";
import { Id } from "../models/id";
import { Observable } from "rxjs";
import { Movie } from "../models/movie.model";

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

  getMovie(id: Id): Observable<Movie> {
    const url = `${this.baseUrlMovie}/${id}`;
    return this.http.get<Movie>(url);
  }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrlMovie);
  }

  deleteMovie(id: Id): Observable<boolean> {
    const url = `${this.baseUrlMovie}/${id}`;
    return this.http.delete<boolean>(url);
  }

  updateMovie(data: Movie): Observable<Movie> {
    const url = `${this.baseUrlMovie}/${data.idMovie}`;
    return this.http.patch<Movie>(url, data);
  }
}
