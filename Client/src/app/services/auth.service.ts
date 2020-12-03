import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthAccessModel } from "../models/auth-access.model";
import { RegisterUserModel } from "../models/register-user.model";
import { LoginUserModel } from "../models/login-user.model";
import { ApiRouting } from "../routers/api-routing.module";
import { tap } from "rxjs/operators";
import { API_URL } from "../app-injection-tokens";
import { KeyLocalStorage } from "../key-local-storage";
import { UserType } from "../models/user-type";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
    private jwtHelperService: JwtHelperService,
  ) {
    if (this.isAuthenticated()) {
      this.setAuthorized(true);
    }
  }

  private authorizedSubject$ = new BehaviorSubject<boolean>(false);

  private static setAuthDataToLocalStorage(authAccess: AuthAccessModel): void {
    localStorage.setItem(KeyLocalStorage.AccessToken, authAccess.accessToken);
    localStorage.setItem(KeyLocalStorage.IdUser, authAccess.idUser);
  }

  private static clearAuthDataToLocalStorage(): void {
    localStorage.removeItem(KeyLocalStorage.AccessToken);
    localStorage.removeItem(KeyLocalStorage.IdUser);
  }

  getAuthorized(): Observable<boolean> {
    return this.authorizedSubject$.asObservable();
  }

  private setAuthorized(value: boolean): void {
    this.authorizedSubject$.next(value);
  }

  private getUserType(): string {
    return this.jwtHelperService.decodeToken(this.getTokenFromLocalStorage())?.role || "";
  }

  isUserTypeUser(): boolean {
    return this.getUserType() === UserType.User;
  }

  isUserTypeAdmin(): boolean {
    return this.getUserType() === UserType.Admin;
  }

  loginUserRequest(data: LoginUserModel): Observable<AuthAccessModel> {
    const url = this.apiUrl + ApiRouting.Login;
    return this.http.post<AuthAccessModel>(url, data).pipe(
      tap((authAccess) => {
          AuthService.setAuthDataToLocalStorage(authAccess);
          this.setAuthorized(true);
        }
      )
    );
  }

  registerUserRequest(data: RegisterUserModel): Observable<AuthAccessModel> {
    const url = this.apiUrl + ApiRouting.Register;
    return this.http.post<AuthAccessModel>(url, data).pipe(
      tap((authAccess) => {
          AuthService.setAuthDataToLocalStorage(authAccess);
          this.setAuthorized(true);
        }
      )
    );
  }

  getTokenFromLocalStorage(): string {
    return localStorage.getItem(KeyLocalStorage.AccessToken);
  }

  getIdUserFromLocalStorage(): string {
    return localStorage.getItem(KeyLocalStorage.IdUser);
  }

  isAuthenticated(): boolean {
    return !this.jwtHelperService.isTokenExpired(this.getTokenFromLocalStorage());
  }

  logoutUser(): void {
    AuthService.clearAuthDataToLocalStorage();
    this.setAuthorized(false);
  }

  loginUser(data: LoginUserModel): Promise<void> {
    return new Promise((resolve) => {
      this.loginUserRequest(data).subscribe(() => {
        resolve();
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  registerUser(data: RegisterUserModel): Promise<void> {
    return new Promise((resolve) => {
      this.registerUserRequest(data).subscribe(() => {
        resolve();
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }
}
