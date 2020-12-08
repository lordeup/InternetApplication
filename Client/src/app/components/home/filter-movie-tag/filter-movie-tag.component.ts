import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MovieTagModel } from "../../../models/movie-tag.model";

@Component({
  selector: "app-filter-movie-tag",
  templateUrl: "./filter-movie-tag.component.html",
  styleUrls: ["./filter-movie-tag.component.scss"]
})
export class FilterMovieTagComponent implements OnInit {
  @Input() public allMovieTags: MovieTagModel[];
  @Output() public changeEventFilterData = new EventEmitter<{ fieldName: string, value?: string | MovieTagModel[] }>();

  public formGroup: FormGroup;
  private previousMovieTags: MovieTagModel[] = [];
  private movieTagsFieldName = "movieTags";

  constructor(
    private formBuilder: FormBuilder) {
  }

  async ngOnInit(): Promise<void> {
    this.formGroup = this.formBuilder.group({
      [this.movieTagsFieldName]: new FormControl([]),
    });
  }

  compareByValue(a: MovieTagModel, b: MovieTagModel): boolean {
    return a.idMovieTag === b.idMovieTag;
  }

  get movieTagsValue(): MovieTagModel[] {
    return this.formGroup.get(this.movieTagsFieldName).value;
  }

  setPreviousMovieTags(): void {
    this.previousMovieTags = this.movieTagsValue;
  }

  onSubmitFilter(): void {
    if (JSON.stringify(this.movieTagsValue) !== JSON.stringify(this.previousMovieTags)) {
      this.changeEventFilterData.emit({
        fieldName: this.movieTagsFieldName,
        value: this.movieTagsValue.length ? this.movieTagsValue : undefined,
      });
    }
    this.setPreviousMovieTags();
  }

  onClearFilter(event: MouseEvent): void {
    event.stopPropagation();
    this.formGroup.patchValue({
      [this.movieTagsFieldName]: [],
    });
    this.setPreviousMovieTags();
    this.changeEventFilterData.emit({
      fieldName: this.movieTagsFieldName
    });
  }
}
