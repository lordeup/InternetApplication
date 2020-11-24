import { Component, Inject, OnInit } from "@angular/core";
import { REQUIRED_TITLE_ERROR } from "../../const";
import { DialogTitle } from "../../models/dialog-title";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { UserModel } from "../../models/user.model";
import { FileManagerService } from "../../services/file-manager.service";

export interface IDialogUserData {
  title: DialogTitle;
  user?: UserModel;
}

export interface IDialogUserResponse {
  user: UserModel;
  file?: File;
}

@Component({
  selector: "app-dialog-user",
  templateUrl: "./dialog-user.component.html",
  styleUrls: ["./dialog-user.component.css"]
})
export class DialogUserComponent implements OnInit {
  public formGroup: FormGroup;
  public title: string;
  public imageFile: File;

  constructor(
    private dialogRef: MatDialogRef<DialogUserComponent>,
    private formBuilder: FormBuilder,
    private fileManagerService: FileManagerService,
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

  dataValidation(data: UserModel): IDialogUserResponse {
    const {user} = this.dialogData;
    data.password = data.password || user?.password;
    if (!!user?.idUser) {
      data.idUser = user?.idUser;
    }
    if (!!user?.idUserType) {
      data.idUserType = user?.idUserType;
    }

    const response: IDialogUserResponse = {
      user: data
    };

    if (!!this.imageFile) {
      response.file = this.imageFile;
    }

    return response;
  }

  selectFile(event): void {
    if (!!event.target.files?.length) {
      const [file]: File[] = event.target.files;
      this.imageFile = file;
    }
  }

  getFilePath(fileName: string): string {
    return !!fileName ? this.fileManagerService.getFilePath(fileName) : "";
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const data = new UserModel().deserialize(this.formGroup.value);
    const response = this.dataValidation(data);
    this.dialogRef.close(response);
  }
}
