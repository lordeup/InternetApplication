import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app-injection-tokens";
import { ApiRouting } from "../../routers/api-routing.module";
import { Observable } from "rxjs";
import { Id } from "../../models/id";
import { ReviewModel } from "../../models/review.model";
import { MovieModel } from "../../models/movie.model";

@Injectable({
  providedIn: "root"
})
export class ReviewDataService {

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

  getReviewMoviesByIdUserRequest(id: Id): Observable<MovieModel[]> {
    const url = `${this.baseUrlReview}/movies/user/${id}`;
    return this.http.get<MovieModel[]>(url);
  }

  getReviewsByIdMovieRequest(id: Id): Observable<ReviewModel[]> {
    const url = `${this.baseUrlReview}/movie/${id}`;
    return this.http.get<ReviewModel[]>(url);
  }

  updateReviewRequest(data: ReviewModel): Observable<boolean> {
    const url = `${this.baseUrlReview}/${data.idReview}`;
    return this.http.patch<boolean>(url, data);
  }

  addReviewRequest(data: ReviewModel): Observable<ReviewModel> {
    return this.http.post<ReviewModel>(this.baseUrlReview, data);
  }

  deleteReviewRequest(id: Id): Observable<boolean> {
    const url = `${this.baseUrlReview}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
