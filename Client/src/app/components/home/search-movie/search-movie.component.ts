import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MovieTagModel } from "../../../models/movie-tag.model";

@Component({
  selector: "app-search-movie",
  templateUrl: "./search-movie.component.html",
  styleUrls: ["./search-movie.component.scss"]
})
export class SearchMovieComponent implements OnInit {
  @Output() public changeEventFilterData = new EventEmitter<{ fieldName: string, value?: string | MovieTagModel[] }>();

  public formGroup: FormGroup;
  private previousValue: string;
  private movieNameFieldName = "name";

  constructor(
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      [this.movieNameFieldName]: "",
    });
  }

  get value(): string {
    return this.formGroup.get(this.movieNameFieldName).value;
  }

  setPreviousValue(): void {
    this.previousValue = this.value;
  }

  onSubmitFilter(): void {
    if (this.previousValue !== this.value) {
      this.changeEventFilterData.emit({
        fieldName: this.movieNameFieldName,
        value: this.value,
      });
    }
    this.setPreviousValue();
  }

  onClearFilter(): void {
    this.formGroup.patchValue({
      [this.movieNameFieldName]: "",
    });
    this.setPreviousValue();
    this.changeEventFilterData.emit({
      fieldName: this.movieNameFieldName
    });
  }
}
