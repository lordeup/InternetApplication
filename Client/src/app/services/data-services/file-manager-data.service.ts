import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../../app-injection-tokens";
import { ApiRouting } from "../../routers/api-routing.module";
import { FileModel } from "../../models/file.model";

@Injectable({
  providedIn: "root"
})
export class FileManagerDataService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {
  }

  private baseUrlFileManager = this.apiUrl + ApiRouting.FileManager;

  getFilePath(fileName: string): string {
    return `${this.baseUrlFileManager}/${fileName}`;
  }

  uploadFileRequest(file: File): Promise<FileModel> {
    const url = `${this.baseUrlFileManager}/upload`;
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post<FileModel>(url, formData).toPromise();
  }

  updateFileRequest(fileName: string, file: File): Promise<FileModel> {
    const url = `${this.baseUrlFileManager}/${fileName}`;
    const formData = new FormData();
    formData.append("file", file);

    return this.http.patch<FileModel>(url, formData).toPromise();
  }

  deleteFileRequest(fileName: string): Promise<boolean> {
    const url = `${this.baseUrlFileManager}/${fileName}`;
    return this.http.delete<boolean>(url).toPromise();
  }
}
