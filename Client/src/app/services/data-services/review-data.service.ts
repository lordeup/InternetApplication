import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app-injection-tokens";
import { ApiRouting } from "../../routers/api-routing.module";
import { Id } from "../../models/id";
import { ReviewModel } from "../../models/review.model";
import { MovieModel } from "../../models/movie.model";
import { BaseDataService } from "./base-data.service";

@Injectable({
  providedIn: "root"
})
export class ReviewDataService extends BaseDataService<ReviewModel> {

  constructor(
    protected http: HttpClient,
    @Inject(API_URL) protected apiUrl
  ) {
    super(http, apiUrl, ApiRouting.Review);
  }

  getReviewsByIdUser(id: Id): Promise<ReviewModel[]> {
    const url = `${this.baseUrl}/user/${id}`;
    return this.http.get<ReviewModel[]>(url).toPromise();
  }

  getReviewMoviesByIdUserRequest(id: Id): Promise<MovieModel[]> {
    const url = `${this.baseUrl}/movies/user/${id}`;
    return this.http.get<MovieModel[]>(url).toPromise();
  }

  getReviewsByIdMovieRequest(id: Id): Promise<ReviewModel[]> {
    const url = `${this.baseUrl}/movie/${id}`;
    return this.http.get<ReviewModel[]>(url).toPromise();
  }
}
