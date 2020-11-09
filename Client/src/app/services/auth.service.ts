import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthAccess } from "../models/auth-access.model";
import { RegisterUser } from "../models/register-user.model";
import { LoginUser } from "../models/login-user.model";
import { ApiRouting } from "../routers/api-routing.module";
import { tap } from "rxjs/operators";
import { API_URL } from "../app-injection-tokens";
import { KeyLocalStorage } from "../key-local-storage";

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

  private static setAuthDataToLocalStorage(authAccess: AuthAccess): void {
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

  loginUser(data: LoginUser): Observable<AuthAccess> {
    const url = this.apiUrl + ApiRouting.Login;
    return this.http.post<AuthAccess>(url, data).pipe(
      tap((authAccess) => {
          AuthService.setAuthDataToLocalStorage(authAccess);
          this.setAuthorized(true);
        }
      )
    );
  }

  registerUser(data: RegisterUser): Observable<AuthAccess> {
    const url = this.apiUrl + ApiRouting.Register;
    return this.http.post<AuthAccess>(url, data).pipe(
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
}
