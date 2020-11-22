import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../app-injection-tokens";
import { ApiRouting } from "../routers/api-routing.module";
import { Observable } from "rxjs";
import { FileModel } from "../models/file.model";

@Injectable({
  providedIn: "root"
})
export class FileManagerService {

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string,
  ) {
  }

  private baseUrlFileManager = this.apiUrl + ApiRouting.FileManager;

  getFile(fileName: string): Observable<any> {
    const url = `${this.baseUrlFileManager}/${fileName}`;
    return this.http.get<any>(url);
  }

  uploadFile(file: File): Observable<FileModel> {
    const url = `${this.baseUrlFileManager}/upload`;
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post<FileModel>(url, formData);
  }

  updateFile(fileName: string, file: File): Observable<FileModel> {
    const url = `${this.baseUrlFileManager}/${fileName}`;
    const formData = new FormData();
    formData.append("file", file);

    return this.http.patch<FileModel>(url, formData);
  }

  deleteFile(fileName: string): Observable<boolean> {
    const url = `${this.baseUrlFileManager}/${fileName}`;
    return this.http.delete<boolean>(url);
  }
}
