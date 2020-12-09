import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app-injection-tokens";
import { ApiRouting } from "../../routers/api-routing.module";
import { MovieModel } from "../../models/movie.model";
import { FilterMovieModel } from "../../models/filter-movie.model";
import { BaseDataService } from "./base-data.service";

@Injectable({
  providedIn: "root"
})
export class MovieDataService extends BaseDataService<MovieModel> {

  constructor(
    protected http: HttpClient,
    @Inject(API_URL) protected apiUrl
  ) {
    super(http, apiUrl, ApiRouting.Movie);
  }

  filterMovieRequest(data: Partial<FilterMovieModel>): Promise<MovieModel[]> {
    const url = `${this.baseUrl}/filterMovie`;
    return this.http.post<MovieModel[]>(url, data).toPromise();
  }
}
