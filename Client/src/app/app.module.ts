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
import { UsersComponent } from "./components/users/users.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";

export function tokenGetter(): string {
  return localStorage.getItem(KeyLocalStorage.AccessToken);
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent,
    HeaderComponent,
    HomeComponent,
    MovieComponent,
    UsersComponent,
    UserEditComponent,
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
