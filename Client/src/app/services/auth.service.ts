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
import { UserType } from "../utils/user-type";
import { LocalStorageUtils } from "../utils/local-storage-utils";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
    private jwtHelperService: JwtHelperService,
    private localStorageUtils: LocalStorageUtils,
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

  loginUserRequest(data: LoginUserModel): Observable<AuthAccessModel> {
    const url = this.apiUrl + ApiRouting.Login;
    return this.http.post<AuthAccessModel>(url, data).pipe(
      tap((authAccess) => {
          this.setAuthDataToLocalStorage(authAccess);
          this.setAuthorized(true);
        }
      )
    );
  }

  registerUserRequest(data: RegisterUserModel): Observable<AuthAccessModel> {
    const url = this.apiUrl + ApiRouting.Register;
    return this.http.post<AuthAccessModel>(url, data).pipe(
      tap((authAccess) => {
          this.setAuthDataToLocalStorage(authAccess);
          this.setAuthorized(true);
        }
      )
    );
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
