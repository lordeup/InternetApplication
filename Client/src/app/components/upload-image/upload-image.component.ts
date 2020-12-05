import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FileManagerService } from "../../services/file-manager.service";

@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.css"]
})
export class UploadImageComponent implements OnInit {
  @Input() public previewUrl: string;

  @Output() public changePreviewUrl = new EventEmitter<string>();
  @Output() public changeImageFile = new EventEmitter<File>();

  constructor(
    private fileManagerService: FileManagerService) {
  }

  ngOnInit(): void {
  }

  selectFile(event): void {
    if (!!event.target.files?.length) {
      const [file]: File[] = event.target.files;
      this.changeImageFile.emit(file);
      this.changePreviewUrl.emit(this.fileManagerService.getUrlUploadFile(file));
    }
  }

  onDeletePicture(): void {
    this.changeImageFile.emit();
    this.changePreviewUrl.emit("");
  }

}
