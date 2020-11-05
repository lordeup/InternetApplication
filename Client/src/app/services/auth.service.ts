import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthAccess } from "../models/auth-access.model";
import { RegisterUser } from "../models/register-user.model";
import { LoginUser } from "../models/login-user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  loginUser(data: LoginUser): Observable<AuthAccess> {
    console.log("data", data);
    return ;
  }

  registerUser(data: RegisterUser): Observable<AuthAccess> {
    console.log("data", data);
    return ;
  }
}
