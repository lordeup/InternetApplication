import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app-injection-tokens";
import { LoginUserModel } from "../../models/login-user.model";
import { AuthAccessModel } from "../../models/auth-access.model";
import { ApiRouting } from "../../routers/api-routing.module";
import { RegisterUserModel } from "../../models/register-user.model";

@Injectable({
  providedIn: "root"
})
export class AuthDataService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {
  }

  loginUser(data: LoginUserModel): Promise<AuthAccessModel> {
    const url = this.apiUrl + ApiRouting.Login;
    return this.http.post<AuthAccessModel>(url, data).toPromise();
  }

  registerUser(data: RegisterUserModel): Promise<AuthAccessModel> {
    const url = this.apiUrl + ApiRouting.Register;
    return this.http.post<AuthAccessModel>(url, data).toPromise();
  }
}
