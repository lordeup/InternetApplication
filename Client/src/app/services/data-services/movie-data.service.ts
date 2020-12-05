import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app-injection-tokens";
import { ApiRouting } from "../../routers/api-routing.module";
import { Observable } from "rxjs";
import { Id } from "../../models/id";
import { MovieModel } from "../../models/movie.model";
import { FilterMovieModel } from "../../models/filter-movie.model";

@Injectable({
  providedIn: "root"
})
export class MovieDataService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
  ) {
  }

  private baseUrlMovie = this.apiUrl + ApiRouting.Movie;

  getMoviesRequest(): Observable<MovieModel[]> {
    return this.http.get<MovieModel[]>(this.baseUrlMovie);
  }

  getMovieRequest(id: Id): Observable<MovieModel> {
    const url = `${this.baseUrlMovie}/${id}`;
    return this.http.get<MovieModel>(url);
  }

  filterMovieRequest(data: Partial<FilterMovieModel>): Observable<MovieModel[]> {
    const url = `${this.baseUrlMovie}/filterMovie`;
    return this.http.post<MovieModel[]>(url, data);
  }

  updateMovieRequest(data: MovieModel): Observable<boolean> {
    const url = `${this.baseUrlMovie}/${data.idMovie}`;
    return this.http.patch<boolean>(url, data);
  }

  addMovieRequest(data: MovieModel): Observable<MovieModel> {
    return this.http.post<MovieModel>(this.baseUrlMovie, data);
  }

  deleteMovieRequest(id: Id): Observable<boolean> {
    const url = `${this.baseUrlMovie}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
