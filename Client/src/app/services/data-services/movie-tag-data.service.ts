import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app-injection-tokens";
import { ApiRouting } from "../../routers/api-routing.module";
import { Observable } from "rxjs";
import { Id } from "../../models/id";
import { MovieTagModel } from "../../models/movie-tag.model";

@Injectable({
  providedIn: "root"
})
export class MovieTagDataService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
  ) {
  }

  private baseUrlMovieTag = this.apiUrl + ApiRouting.MovieTag;

  getMovieTagsRequest(): Observable<MovieTagModel[]> {
    return this.http.get<MovieTagModel[]>(this.baseUrlMovieTag);
  }

  getMovieTag(id: Id): Observable<MovieTagModel> {
    const url = `${this.baseUrlMovieTag}/${id}`;
    return this.http.get<MovieTagModel>(url);
  }

  updateMovieTagRequest(data: MovieTagModel): Observable<boolean> {
    const url = `${this.baseUrlMovieTag}/${data.idMovieTag}`;
    return this.http.patch<boolean>(url, data);
  }

  addMovieTagRequest(data: MovieTagModel): Observable<MovieTagModel> {
    return this.http.post<MovieTagModel>(this.baseUrlMovieTag, data);
  }

  deleteMovieTagRequest(id: Id): Observable<boolean> {
    const url = `${this.baseUrlMovieTag}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
