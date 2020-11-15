import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Id } from "../../models/id";
import { UserModel } from "../../models/user.model";
import { MovieTagModel } from "../../models/movie-tag.model";
import { MatDialog } from "@angular/material/dialog";
import {
  DialogDeleteConfirmationComponent,
  IDialogDeleteConfirmationData
} from "../dialog-delete-confirmation/dialog-delete-confirmation.component";
import { DialogTitle } from "../../models/dialog-title";
import { DialogMovieComponent, IDialogMovieData } from "../dialog-movie/dialog-movie.component";
import { DialogUserComponent, IDialogUserData } from "../dialog-user/dialog-user.component";

@Component({
  selector: "app-administration-users",
  templateUrl: "./administration-users.component.html",
  styleUrls: ["./administration-users.component.css"]
})
export class AdministrationUsersComponent implements OnInit {
  users: UserModel[] = [];
  selectedItem: UserModel;

  constructor(
    private userService: UserService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  selectItem(item: UserModel): void {
    this.selectedItem = item;
  }

  editItem(): void {
    const data: IDialogUserData = {
      title: DialogTitle.Edit,
      user: this.selectedItem,
    };
    const dialogRef = this.dialog.open(DialogUserComponent, {data, autoFocus: false});
    dialogRef.afterClosed().subscribe(response => {
        !!response && this.updateUser(response);
      }
    );
  }

  deleteItem(): void {
    const data: IDialogDeleteConfirmationData = {
      title: DialogTitle.Delete,
      text: `Вы уверены, что хотите удалить пользователя с логином: ${this.selectedItem.login}`
    };
    const dialogRef = this.dialog.open(DialogDeleteConfirmationComponent, {data, autoFocus: false});
    dialogRef.afterClosed().subscribe(response => {
        !!response && this.deleteUser(this.selectedItem.idUser);
      }
    );
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  updateUser(data: UserModel): void {
    this.userService.updateUser(data).subscribe(() => {
      this.getUsers();
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  deleteUser(id: Id): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

}
