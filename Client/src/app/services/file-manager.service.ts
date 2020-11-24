import { Injectable } from "@angular/core";
import { FileModel } from "../models/file.model";
import { FileManagerDataService } from "./data-services/file-manager-data.service";

@Injectable({
  providedIn: "root"
})
export class FileManagerService {

  constructor(
    private fileManagerDataService: FileManagerDataService,
  ) {
  }

  getFilePath(fileName: string): string {
    return this.fileManagerDataService.getFilePath(fileName);
  }

  uploadFile(file: File): Promise<FileModel> {
    return new Promise((resolve) => {
      this.fileManagerDataService.uploadFileRequest(file).subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }

  updateFile(fileName: string, file: File): Promise<FileModel> {
    return new Promise((resolve) => {
      this.fileManagerDataService.updateFileRequest(fileName, file).subscribe(response => {
        resolve(response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    });
  }
}
