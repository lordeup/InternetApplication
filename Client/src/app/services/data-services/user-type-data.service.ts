import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app-injection-tokens";
import { BaseDataService } from "./base-data.service";
import { UserTypeModel } from "../../models/user-type.model";
import { ApiRouting } from "../../routers/api-routing.module";

@Injectable({
  providedIn: "root"
})
export class UserTypeDataService extends BaseDataService<UserTypeModel> {

  constructor(
    protected http: HttpClient,
    @Inject(API_URL) protected apiUrl
  ) {
    super(http, apiUrl, ApiRouting.UserType);
  }
}
