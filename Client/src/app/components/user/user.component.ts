import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { UserModel } from "../../models/user.model";
import { MatDialog } from "@angular/material/dialog";
import { DialogTitle } from "../../models/dialog-title";
import { DialogUserComponent, IDialogUserData, IDialogUserResponse } from "../dialog-user/dialog-user.component";
import { Id } from "../../models/id";
import { FileManagerService } from "../../services/file-manager.service";
import { UNKNOWN_USER_IMAGE } from "../../const";

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
    const pictureUrl = response?.user?.pictureUrl;
    const file = response?.file;

    if (!!file) {
      const fileModel = !!pictureUrl
        ? await this.fileManagerService.updateFile(pictureUrl, file)
        : await this.fileManagerService.uploadFile(file);
      response.user.pictureUrl = fileModel.path;
    } else if (!!response?.isDeletePicture && !!pictureUrl) {
      await this.fileManagerService.deleteFile(pictureUrl);
      response.user.pictureUrl = "";
    }

    if (!!response?.user) {
      await this.userService.updateUser(response.user);
      this.user = await this.userService.getUser(this.idUser);
    }
  }

  getFilePath(fileName: string): string {
    return !!fileName ? this.fileManagerService.getFilePath(fileName) : UNKNOWN_USER_IMAGE;
  }
}
