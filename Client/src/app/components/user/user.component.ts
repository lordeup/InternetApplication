import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { UserModel } from "../../models/user.model";
import { MatDialog } from "@angular/material/dialog";
import { DialogTitle } from "../../models/dialog-title";
import { DialogUserComponent, IDialogUserData } from "../dialog-user/dialog-user.component";
import { Id } from "../../models/id";

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
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.idUser = this.authService.getIdUserFromLocalStorage();
    this.getCurrentUser();
  }

  onClickUserEdit(): void {
    const data: IDialogUserData = {
      title: DialogTitle.Edit,
      user: this.user,
    };
    const dialogRef = this.dialog.open(DialogUserComponent, {data, autoFocus: false});
    dialogRef.afterClosed().subscribe(response => {
        !!response && this.updateUser(response);
      }
    );
  }

  getCurrentUser(): void {
    this.userService.getUser(this.idUser).subscribe(response => {
      this.user = response;
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  updateUser(data: UserModel): void {
    this.userService.updateUser(data).subscribe(() => {
      this.getCurrentUser();
    }, error => {
      alert(error.error?.message || error.message);
    });
  }
}
