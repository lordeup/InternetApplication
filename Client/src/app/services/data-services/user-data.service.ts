import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app-injection-tokens";
import { ApiRouting } from "../../routers/api-routing.module";
import { Observable } from "rxjs";
import { Id } from "../../models/id";
import { UserModel } from "../../models/user.model";

@Injectable({
  providedIn: "root"
})
export class UserDataService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
  ) {
  }

  private baseUrlUser = this.apiUrl + ApiRouting.User;

  getUsersRequest(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.baseUrlUser);
  }

  getUserRequest(id: Id): Observable<UserModel> {
    const url = `${this.baseUrlUser}/${id}`;
    return this.http.get<UserModel>(url);
  }

  updateUserRequest(data: UserModel): Observable<boolean> {
    const url = `${this.baseUrlUser}/${data.idUser}`;
    return this.http.patch<boolean>(url, data);
  }

  deleteUserRequest(id: Id): Observable<boolean> {
    const url = `${this.baseUrlUser}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
