import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Id } from "../../models/id";
import { UserModel } from "../../models/user.model";
import { MatDialog } from "@angular/material/dialog";
import {
  DialogDeleteConfirmationComponent,
  IDialogDeleteConfirmationData
} from "../dialog-delete-confirmation/dialog-delete-confirmation.component";
import { DialogTitle } from "../../utils/dialog-title";
import { DialogUserComponent, IDialogUserData, IDialogUserResponse } from "../dialog-user/dialog-user.component";
import { FileManagerService } from "../../services/file-manager.service";
import { FileModel } from "../../models/file.model";

@Component({
  selector: "app-administration-users",
  templateUrl: "./administration-users.component.html",
  styleUrls: ["./administration-users.component.scss"]
})
export class AdministrationUsersComponent implements OnInit {
  public users: UserModel[] = [];
  public selectedItem: UserModel;

  constructor(
    private userService: UserService,
    private fileManagerService: FileManagerService,
    private dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
  }

  selectItem(item: UserModel): void {
    this.selectedItem = item;
  }

  updateItem(): void {
    const data: IDialogUserData = {
      title: DialogTitle.Edit,
      user: this.selectedItem,
    };
    const dialogRef = this.dialog.open(DialogUserComponent, {data, autoFocus: false});

    dialogRef.afterClosed().subscribe(async (response: IDialogUserResponse) => {
        if (!!response) {
          await this.updateUser(response);
        }
      }
    );
  }

  deleteItem(): void {
    const data: IDialogDeleteConfirmationData = {
      title: DialogTitle.Delete,
      text: `Вы уверены, что хотите удалить пользователя с логином: ${this.selectedItem.login}`
    };
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent, {data, autoFocus: false});

    dialogRef.afterClosed().subscribe(async response => {
        if (!!response) {
          await this.deleteUser(this.selectedItem.idUser);
        }
      }
    );
  }

  async updateUser(response: IDialogUserResponse): Promise<void> {
    let fileModel: FileModel;
    if (!!response?.file) {
      fileModel = response.user?.pictureUrl
        ? await this.fileManagerService.updateFile(response.user?.pictureUrl, response.file)
        : await this.fileManagerService.uploadFile(response.file);
    }
    if (!!response?.user) {
      response.user.pictureUrl = !!fileModel ? fileModel.path : response.user?.pictureUrl;
      await this.userService.updateUser(response.user);
      this.users = await this.userService.getUsers();
    }
  }

  async deleteUser(id: Id): Promise<void> {
    await this.userService.deleteUser(id);
    this.users = this.users.filter(user => user.idUser !== id);
  }
}
