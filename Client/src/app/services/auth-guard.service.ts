import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { AppRoutingService } from "../routers/app-routing.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private appRoutingService: AppRoutingService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      this.appRoutingService.goToHomePage();
      return false;
    }

    return true;
  }
}
