import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthAccessModel } from "../models/auth-access.model";
import { RegisterUserModel } from "../models/register-user.model";
import { LoginUserModel } from "../models/login-user.model";
import { UserType } from "../utils/user-type";
import { LocalStorageUtils } from "../utils/local-storage-utils";
import { AuthDataService } from "./data-services/auth-data.service";
import { AppRoutingService } from "../routers/app-routing.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(
    private authDataService: AuthDataService,
    private jwtHelperService: JwtHelperService,
    private localStorageUtils: LocalStorageUtils,
    private appRoutingService: AppRoutingService
  ) {
    if (this.isAuthenticated()) {
      this.setAuthorized(true);
    }
  }

  private authorizedSubject$ = new BehaviorSubject<boolean>(false);

  private setAuthDataToLocalStorage(authAccess: AuthAccessModel): void {
    this.localStorageUtils.setAccessToken(authAccess.accessToken);
    this.localStorageUtils.setIdUser(authAccess.idUser);
  }

  getAuthorized(): Observable<boolean> {
    return this.authorizedSubject$.asObservable();
  }

  private setAuthorized(value: boolean): void {
    this.authorizedSubject$.next(value);
  }

  private getUserType(): string {
    const accessToken = this.localStorageUtils.getAccessToken();
    return this.jwtHelperService.decodeToken(accessToken)?.role || "";
  }

  isUserTypeUser(): boolean {
    return this.getUserType() === UserType.User;
  }

  isUserTypeAdmin(): boolean {
    return this.getUserType() === UserType.Admin;
  }

  isAuthenticated(): boolean {
    const accessToken = this.localStorageUtils.getAccessToken();
    return !this.jwtHelperService.isTokenExpired(accessToken);
  }

  logoutUser(): void {
    this.localStorageUtils.removeAccessToken();
    this.localStorageUtils.removeIdUser();
    this.setAuthorized(false);
  }

  async loginUser(data: LoginUserModel): Promise<void> {
    try {
      const authAccess = await this.authDataService.loginUser(data);
      this.setAuthDataToLocalStorage(authAccess);
      this.setAuthorized(true);
      this.appRoutingService.goToUserPage();
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async registerUser(data: RegisterUserModel): Promise<void> {
    try {
      const authAccess = await this.authDataService.registerUser(data);
      this.setAuthDataToLocalStorage(authAccess);
      this.setAuthorized(true);
      this.appRoutingService.goToUserPage();
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }
}
