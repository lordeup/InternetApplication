import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { JwtModule } from "@auth0/angular-jwt";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { environment } from "../environments/environment";
import { AppMaterialModule } from "./app-material.module";
import { AppRoutingModule } from "src/app/routers/app-routing.module";
import { API_URL } from "./app-injection-tokens";
import { KeyLocalStorage } from "./key-local-storage";

import { AppComponent } from "./app.component";
import { RegisterComponent } from "./components/register/register.component";
import { LoginComponent } from "./components/login/login.component";
import { UserComponent } from "./components/user/user.component";
import { HeaderComponent } from "./components/header/header.component";
import { HomeComponent } from "./components/home/home.component";
import { MovieComponent } from "./components/movie/movie.component";
import { GridColsDirective } from "./directives/grid-cols-directive";
import { AdministrationMovieTagsComponent } from "./components/administration-movie-tags/administration-movie-tags.component";
import { AdministrationUsersComponent } from "./components/administration-users/administration-users.component";
import { AdministrationMoviesComponent } from "./components/administration-movies/administration-movies.component";
import { DialogMovieTagComponent } from "./components/dialog-movie-tag/dialog-movie-tag.component";
import { DialogDeleteConfirmationComponent } from "./components/dialog-delete-confirmation/dialog-delete-confirmation.component";
import { DialogMovieComponent } from "./components/dialog-movie/dialog-movie.component";
import { DialogUserComponent } from "./components/dialog-user/dialog-user.component";
import { MovieRatingComponent } from "./components/movie/movie-rating/movie-rating.component";
import { MovieAddReviewComponent } from "./components/movie/movie-add-review/movie-add-review.component";
import { MovieReviewsComponent } from "./components/movie/movie-reviews/movie-reviews.component";
import { DialogReviewComponent } from "./components/dialog-review/dialog-review.component";
import { StarRatingComponent } from "./components/star-rating/star-rating.component";
import { UserReviewMoviesComponent } from "./components/user/user-review-movies/user-review-movies.component";
import { UploadImageComponent } from "./components/upload-image/upload-image.component";

export function tokenGetter(): string {
  return localStorage.getItem(KeyLocalStorage.AccessToken);
}

@NgModule({
  declarations: [
    AppComponent,
    GridColsDirective,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    HeaderComponent,
    HomeComponent,
    MovieComponent,
    AdministrationMovieTagsComponent,
    AdministrationUsersComponent,
    AdministrationMoviesComponent,
    DialogMovieTagComponent,
    DialogDeleteConfirmationComponent,
    DialogMovieComponent,
    DialogUserComponent,
    MovieRatingComponent,
    MovieAddReviewComponent,
    MovieReviewsComponent,
    DialogReviewComponent,
    StarRatingComponent,
    UserReviewMoviesComponent,
    UploadImageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.jwtAllowedDomains
      }
    })
  ],
  providers: [
    {
      provide: API_URL,
      useValue: environment.apiUrl
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
