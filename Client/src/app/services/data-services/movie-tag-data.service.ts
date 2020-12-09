import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app-injection-tokens";
import { ApiRouting } from "../../routers/api-routing.module";
import { MovieTagModel } from "../../models/movie-tag.model";
import { BaseDataService } from "./base-data.service";

@Injectable({
  providedIn: "root"
})
export class MovieTagDataService extends BaseDataService<MovieTagModel> {

  constructor(
    protected http: HttpClient,
    @Inject(API_URL) protected apiUrl
  ) {
    super(http, apiUrl, ApiRouting.MovieTag);
  }
}
