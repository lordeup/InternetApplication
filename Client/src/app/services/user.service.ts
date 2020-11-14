import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../app-injection-tokens";
import { Observable } from "rxjs";
import { UserModel } from "../models/user.model";
import { ApiRouting } from "../routers/api-routing.module";
import { Id } from "../models/id";

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
  ) {
  }

  private baseUrlUser = this.apiUrl + ApiRouting.User;

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.baseUrlUser);
  }

  getUser(id: Id): Observable<UserModel> {
    const url = `${this.baseUrlUser}/${id}`;
    return this.http.get<UserModel>(url);
  }

  updateUser(data: UserModel): Observable<boolean> {
    const url = `${this.baseUrlUser}/${data.idUser}`;
    return this.http.patch<boolean>(url, data);
  }

  deleteUser(id: Id): Observable<boolean> {
    const url = `${this.baseUrlUser}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
