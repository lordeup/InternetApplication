import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../app-injection-tokens";
import { ApiRouting } from "../routers/api-routing.module";
import { Id } from "../models/id";
import { Observable } from "rxjs";
import { UserTypeModel } from "../models/user-type.model";

@Injectable({
  providedIn: "root"
})
export class UserTypeService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
  ) {
  }

  private baseUrlUserType = this.apiUrl + ApiRouting.UserType;

  getUserTypes(): Observable<UserTypeModel[]> {
    return this.http.get<UserTypeModel[]>(this.baseUrlUserType);
  }

  getUserType(id: Id): Observable<UserTypeModel> {
    const url = `${this.baseUrlUserType}/${id}`;
    return this.http.get<UserTypeModel>(url);
  }

  updateUserType(data: UserTypeModel): Observable<boolean> {
    const url = `${this.baseUrlUserType}/${data.idUserType}`;
    return this.http.patch<boolean>(url, data);
  }

  addUserType(data: UserTypeModel): Observable<UserTypeModel> {
    return this.http.post<UserTypeModel>(this.baseUrlUserType, data);
  }

  deleteUserType(id: Id): Observable<boolean> {
    const url = `${this.baseUrlUserType}/${id}`;
    return this.http.delete<boolean>(url);
  }
}
