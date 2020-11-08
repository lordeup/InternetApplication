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
  },
  {
    path: PathRouting.UserEdit,
    component: UserEditComponent,
  },
  {
    path: PathRouting.Users,
    component: UsersComponent,
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
