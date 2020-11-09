import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "src/app/components/user/user.component";
import { HomeComponent } from "src/app/components/home/home.component";
import { LoginComponent } from "src/app/components/login/login.component";
import { RegisterComponent } from "src/app/components/register/register.component";
import { PathRouting } from "./path-routing.module";
import { UsersComponent } from "../components/users/users.component";
import { MovieComponent } from "../components/movie/movie.component";
import { UserEditComponent } from "../components/user-edit/user-edit.component";
import { AuthGuardService } from "../services/auth-guard.service";

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
    path: PathRouting.UserEdit,
    component: UserEditComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: PathRouting.Users,
    component: UsersComponent,
    canActivate: [AuthGuardService],
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
