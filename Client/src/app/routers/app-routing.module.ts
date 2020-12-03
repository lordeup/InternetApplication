import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "src/app/components/user/user.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { LoginComponent } from "src/app/components/login/login.component";
import { RegisterComponent } from "src/app/components/register/register.component";
import { PathRouting } from "./path-routing.module";
import { MovieComponent } from "../components/movie/movie.component";
import { AuthGuardService } from "../services/auth-guard.service";
import { AdminAuthGuardService } from "../services/admin-auth-guard.service";
import { AdministrationMovieTagsComponent } from "../components/administration-movie-tags/administration-movie-tags.component";
import { AdministrationUsersComponent } from "../components/administration-users/administration-users.component";
import { AdministrationMoviesComponent } from "../components/administration-movies/administration-movies.component";

const routes: Routes = [
  {
    path: PathRouting.Home,
    component: HomeComponent,
  },
  {
    path: PathRouting.Login,
    component: LoginComponent,
  },
  {
    path: PathRouting.Register,
    component: RegisterComponent,
  },
  {
    path: PathRouting.User,
    component: UserComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: PathRouting.AdministrationUsers,
    component: AdministrationUsersComponent,
    canActivate: [AdminAuthGuardService],
  },
  {
    path: PathRouting.AdministrationMovies,
    component: AdministrationMoviesComponent,
    canActivate: [AdminAuthGuardService],
  },
  {
    path: PathRouting.AdministrationMovieTags,
    component: AdministrationMovieTagsComponent,
    canActivate: [AdminAuthGuardService],
  },
  {
    path: `${PathRouting.Movie}/:id`,
    component: MovieComponent,
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
