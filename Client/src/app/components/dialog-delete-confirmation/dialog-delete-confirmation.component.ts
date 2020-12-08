import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DialogTitle } from "../../utils/dialog-title";

export interface IDialogDeleteConfirmationData {
  title: DialogTitle;
  text: string;
}

@Component({
  selector: "app-dialog-delete-confirmation",
  templateUrl: "./dialog-delete-confirmation.component.html",
  styleUrls: ["./dialog-delete-confirmation.component.scss"]
})
export class DialogDeleteConfirmationComponent implements OnInit {
  public title: string;
  public text: string;

  constructor(
    private dialogRef: MatDialogRef<DialogDeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IDialogDeleteConfirmationData) {
  }

  ngOnInit(): void {
    this.title = this.data.title || "";
    this.text = this.data.text || "";
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(true);
  }

}
