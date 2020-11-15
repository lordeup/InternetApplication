import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PathRouting } from "./path-routing.module";
import { Id } from "../models/id";

@Injectable({
  providedIn: "root"
})
export class AppRoutingService {

  constructor(private router: Router) {
  }

  goToHomePage(): void {
    this.router.navigateByUrl(PathRouting.Home);
  }

  goToLoginPage(): void {
    this.router.navigateByUrl(PathRouting.Login);
  }

  goToRegisterPage(): void {
    this.router.navigateByUrl(PathRouting.Register);
  }

  goToUserPage(): void {
    this.router.navigateByUrl(PathRouting.User);
  }

  goToMoviePage(id: Id): void {
    this.router.navigateByUrl(`${PathRouting.Movie}/${id}`);
  }
}
