import { Component, HostBinding, OnInit } from "@angular/core";
import { AppRoutingService } from "../../routers/app-routing.service";
import { AuthService } from "../../services/auth.service";
import { Observable } from "rxjs";
import { PathRouting } from "../../routers/path-routing.module";
import { MatSlideToggleChange } from "@angular/material/slide-toggle";
import { OverlayContainer } from "@angular/cdk/overlay";
import { LocalStorageUtils } from "../../utils/local-storage-utils";

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
  public isDarkMode: boolean;

  @HostBinding("class") private className: string;

  constructor(
    private authService: AuthService,
    private localStorageUtils: LocalStorageUtils,
    private overlayContainer: OverlayContainer,
    private appRoutingService: AppRoutingService) {
  }

  ngOnInit(): void {
    this.authorized$ = this.authService.getAuthorized();
    this.menus = ADMINISTRATION_MENUS;
    this.isDarkMode = JSON.parse(this.localStorageUtils.getDarkMode()) || false;
    this.onChangeDarkClassName(this.isDarkMode);
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

  onChangeDarkClassName(value: boolean): void {
    const darkClassName = "darkMode";
    const classList = this.overlayContainer.getContainerElement().classList;

    this.className = value ? darkClassName : "";
    if (value) {
      classList.add(darkClassName);
    } else if (classList.contains(darkClassName)) {
      classList.remove(darkClassName);
    }
  }

  onChangeDarkMode(event: MatSlideToggleChange): void {
    const value = event.checked;
    this.isDarkMode = value;
    this.localStorageUtils.setDarkMode(value);
    this.onChangeDarkClassName(value);
  }
}
