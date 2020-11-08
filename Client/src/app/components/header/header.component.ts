import { Component, OnInit } from "@angular/core";
import { AppRoutingService } from "../../routers/app-routing.service";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  authorized$: Observable<boolean>;

  constructor(
    private appRoutingService: AppRoutingService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authorized$ = this.authService.authorized$;
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  onClickHomePage(): void {
    this.appRoutingService.goToHomePage();
  }

  onClickLoginPage(): void {
    this.appRoutingService.goToLoginPage();
  }

  onClickUserProfile(): void {
    this.appRoutingService.goToUserPage();
  }

  onClickLogout(): void {
    this.authService.logoutUser();
    this.appRoutingService.goToHomePage();
  }
}
