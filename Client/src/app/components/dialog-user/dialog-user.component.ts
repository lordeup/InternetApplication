import { Component, Inject, OnInit } from "@angular/core";
import { DialogTitle } from "../../utils/dialog-title";
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
  isDeletePicture?: boolean;
}

@Component({
  selector: "app-dialog-user",
  templateUrl: "./dialog-user.component.html",
  styleUrls: ["./dialog-user.component.scss"]
})
export class DialogUserComponent implements OnInit {
  public formGroup: FormGroup;
  public title: string;
  public imageFile: File | undefined;
  public previewUrl: string;

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
    this.previewUrl = this.getFilePath(user?.pictureUrl);
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

    if (!!user?.pictureUrl && !this.imageFile && !this.previewUrl) {
      response.isDeletePicture = true;
    }

    if (!!this.imageFile) {
      response.file = this.imageFile;
    }

    return response;
  }

  setImageFile(file?: File): void {
    this.imageFile = file;
  }

  setPreviewUrl(value: string): void {
    this.previewUrl = value;
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
