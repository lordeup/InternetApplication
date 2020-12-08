import { Component, OnInit } from "@angular/core";
import { AppRoutingService } from "../../routers/app-routing.service";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";
import { PathRouting } from "../../routers/path-routing.module";

interface IAdministrationMenu {
  title: string;
  route: string;
  icon: string;
}

const ADMINISTRATION_MENUS: IAdministrationMenu[] = [
  {
    title: "Пользователи",
    route: PathRouting.AdministrationUsers,
    icon: "person",
  },
  {
    title: "Фильмы",
    route: PathRouting.AdministrationMovies,
    icon: "movie",
  },
  {
    title: "Жанры фильмов",
    route: PathRouting.AdministrationMovieTags,
    icon: "assignment",
  },
];

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public authorized$: Observable<boolean>;
  public menus: IAdministrationMenu[] = [];

  constructor(
    private authService: AuthService,
    private appRoutingService: AppRoutingService) {
  }

  ngOnInit(): void {
    this.authorized$ = this.authService.getAuthorized();
    this.menus = ADMINISTRATION_MENUS;
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

  isUserTypeAdmin(): boolean {
    return this.authService.isUserTypeAdmin();
  }
}
