import { Injectable } from "@angular/core";
import { FileModel } from "../models/file.model";
import { FileManagerDataService } from "./data-services/file-manager-data.service";

@Injectable({
  providedIn: "root"
})
export class FileManagerService {

  constructor(
    private fileManagerDataService: FileManagerDataService
  ) {
  }

  getFilePath(fileName: string): string {
    return this.fileManagerDataService.getFilePath(fileName);
  }

  getUrlUploadFile(file: File): string {
    return URL.createObjectURL(file);
  }

  async uploadFile(file: File): Promise<FileModel> {
    try {
      return await this.fileManagerDataService.uploadFileRequest(file);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async updateFile(fileName: string, file: File): Promise<FileModel> {
    try {
      return await this.fileManagerDataService.updateFileRequest(fileName, file);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      await this.fileManagerDataService.deleteFileRequest(fileName);
    } catch (e) {
      alert(e.error?.message || e.message);
    }
  }
}
