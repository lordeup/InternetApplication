import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { UserModel } from "../../models/user.model";
import { MatDialog } from "@angular/material/dialog";
import { DialogTitle } from "../../models/dialog-title";
import { DialogUserComponent, IDialogUserData, IDialogUserResponse } from "../dialog-user/dialog-user.component";
import { Id } from "../../models/id";
import { FileManagerService } from "../../services/file-manager.service";
import { FileModel } from "../../models/file.model";

// const UNKNOWN_USER_IMAGE = require("src/assets/unknown-user.png");
const UNKNOWN_USER_IMAGE = "assets/unknown-user.png";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  public idUser: Id;
  public user: UserModel;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private fileManagerService: FileManagerService,
    private dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {
    this.idUser = this.authService.getIdUserFromLocalStorage();
    this.user = await this.userService.getUser(this.idUser);
  }

  onClickUserEdit(): void {
    const data: IDialogUserData = {
      title: DialogTitle.Edit,
      user: this.user,
    };
    const dialogRef = this.dialog.open(DialogUserComponent, {data, autoFocus: false});

    dialogRef.afterClosed().subscribe(async (response: IDialogUserResponse) => {
        if (!!response) {
          await this.updateUser(response);
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
      this.user = await this.userService.getUser(this.idUser);
    }
  }

  getFilePath(fileName: string): string {
    return !!fileName ? this.fileManagerService.getFilePath(fileName) : UNKNOWN_USER_IMAGE;
  }
}
