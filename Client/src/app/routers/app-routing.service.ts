import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { PathRouting } from "./path-routing.module";

@Injectable({
  providedIn: "root"
})
export class AppRoutingService {

  constructor(private router: Router) { }

  goToHomePage(): void {
    this.router.navigateByUrl("/");
  }

  goToLoginPage(): void {
    this.router.navigateByUrl(PathRouting.Login);
  }

  goToRegisterPage(): void {
    this.router.navigateByUrl(PathRouting.Register);
  }
}
