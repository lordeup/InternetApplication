import { Component, Inject, OnInit } from "@angular/core";
import { REQUIRED_TITLE_ERROR } from "../../const";
import { DialogTitle } from "../../models/dialog-title";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserModel } from "../../models/user.model";

export interface IDialogUserData {
  title: DialogTitle;
  user?: UserModel;
}

@Component({
  selector: "app-dialog-user",
  templateUrl: "./dialog-user.component.html",
  styleUrls: ["./dialog-user.component.css"]
})
export class DialogUserComponent implements OnInit {
  formGroup: FormGroup;
  title: string;

  constructor(
    private dialogRef: MatDialogRef<DialogUserComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private dialogData: IDialogUserData) {
  }

  ngOnInit(): void {
    const {user, title} = this.dialogData;
    this.formGroup = this.formBuilder.group({
      login: [user?.login || "", Validators.required],
      password: "",
      name: user?.name || "",
      surname: user?.surname || "",
      pictureUrl: user?.pictureUrl || "",
    });
    this.title = title || "";
  }

  getErrorLogin(): string {
    return this.formGroup.get("login").hasError("required") ? REQUIRED_TITLE_ERROR : "";
  }

  dataValidation(data: UserModel): UserModel {
    const {user} = this.dialogData;
    data.password = data.password || user?.password;
    if (!!user?.idUser) {
      data.idUser = user?.idUser;
    }
    if (!!user?.idUserType) {
      data.idUserType = user?.idUserType;
    }

    return data;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const data = new UserModel().deserialize(this.formGroup.value);
    this.dataValidation(data);
    this.dialogRef.close(data);
  }
}
