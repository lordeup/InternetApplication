import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../app-injection-tokens";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
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

  getUser(id: Id): Observable<User> {
    const url = `${this.baseUrlUser}/${id}`;
    return this.http.get<User>(url);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrlUser);
  }

  deleteUser(id: Id): Observable<boolean> {
    const url = `${this.baseUrlUser}/${id}`;
    return this.http.delete<boolean>(url);
  }

  updateUser(data: User): Observable<User> {
    const url = `${this.baseUrlUser}/${data.idUser}`;
    return this.http.patch<User>(url, data);
  }
}
