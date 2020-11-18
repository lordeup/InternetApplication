import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../app-injection-tokens";
import { ApiRouting } from "../routers/api-routing.module";
import { Id } from "../models/id";
import { Observable } from "rxjs";
import { ReviewModel } from "../models/review.model";
import { MovieModel } from "../models/movie.model";

@Injectable({
  providedIn: "root"
})
export class ReviewService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
  ) {
  }

  private baseUrlReview = this.apiUrl + ApiRouting.Review;

  getReviews(): Observable<ReviewModel[]> {
    return this.http.get<ReviewModel[]>(this.baseUrlReview);
  }

  getReview(id: Id): Observable<ReviewModel> {
    const url = `${this.baseUrlReview}/${id}`;
    return this.http.get<ReviewModel>(url);
  }

  getReviewsByIdUser(id: Id): Observable<ReviewModel[]> {
    const url = `${this.baseUrlReview}/user/${id}`;
    return this.http.get<ReviewModel[]>(url);
  }

  getReviewMoviesByIdUser(id: Id): Observable<MovieModel[]> {
    const url = `${this.baseUrlReview}/movies/user/${id}`;
    return this.http.get<MovieModel[]>(url);
  }

  getReviewsByIdMovie(id: Id): Observable<ReviewModel[]> {
    const url = `${this.baseUrlReview}/movie/${id}`;
    return this.http.get<ReviewModel[]>(url);
  }

  updateReview(data: ReviewModel): Observable<boolean> {
    const url = `${this.baseUrlReview}/${data.idReview}`;
    return this.http.patch<boolean>(url, data);
  }

  addReview(data: ReviewModel): Observable<ReviewModel> {
    return this.http.post<ReviewModel>(this.baseUrlReview, data);
  }

  deleteReview(id: Id): Observable<boolean> {
    const url = `${this.baseUrlReview}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
