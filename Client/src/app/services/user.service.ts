import { Injectable } from "@angular/core";
import { UserModel } from "../models/user.model";
import { Id } from "../models/id";
import { UserDataService } from "./data-services/user-data.service";

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(
    private userDataService: UserDataService
  ) {
  }

  async getUsers(): Promise<UserModel[]> {
    try {
      return await this.userDataService.getAll();
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async getUser(id: Id): Promise<UserModel> {
    try {
      return await this.userDataService.getById(id);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async updateUser(data: UserModel): Promise<void> {
    try {
      await this.userDataService.update(data.idUser, data);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async deleteUser(id: Id): Promise<void> {
    try {
      await this.userDataService.delete(id);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }
}
