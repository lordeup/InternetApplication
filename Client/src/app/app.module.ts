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
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { GridColsDirective } from "./directives/grid-cols-directive";
import { AdministrationMovieTagsComponent } from "./components/administration-movie-tags/administration-movie-tags.component";
import { AdministrationUsersComponent } from "./components/administration-users/administration-users.component";
import { AdministrationMoviesComponent } from "./components/administration-movies/administration-movies.component";
import { DialogMovieTagComponent } from "./components/dialog-movie-tag/dialog-movie-tag.component";
import { DialogDeleteConfirmationComponent } from "./components/dialog-delete-confirmation/dialog-delete-confirmation.component";
import { DialogMovieComponent } from "./components/dialog-movie/dialog-movie.component";

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
    UserEditComponent,
    AdministrationMovieTagsComponent,
    AdministrationUsersComponent,
    AdministrationMoviesComponent,
    DialogMovieTagComponent,
    DialogDeleteConfirmationComponent,
    DialogMovieComponent,
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
