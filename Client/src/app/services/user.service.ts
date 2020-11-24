import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { Id } from "../models/id";
import { UserDataService } from "./data-services/user-data.service";

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(
    private userDataService: UserDataService,
  ) {
  }

  getUsers(): Promise<UserModel[]> {
    return new Promise((resolve) => {
      this.userDataService.getUsersRequest().subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  getUser(id: Id): Promise<UserModel> {
    return new Promise((resolve) => {
      this.userDataService.getUserRequest(id).subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  updateUser(data: UserModel): Promise<void> {
    return new Promise((resolve) => {
      this.userDataService.updateUserRequest(data).subscribe(() => {
        resolve();
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  deleteUser(id: Id): Promise<void> {
    return new Promise((resolve) => {
      this.userDataService.deleteUserRequest(id).subscribe(() => {
        resolve();
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }
}
