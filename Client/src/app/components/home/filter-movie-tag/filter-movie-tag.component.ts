import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MovieTagModel } from "../../../models/movie-tag.model";
import { CollectionMovieTagModel } from "../../../models/collection-movie-tag-.model";

@Component({
  selector: "app-filter-movie-tag",
  templateUrl: "./filter-movie-tag.component.html",
  styleUrls: ["./filter-movie-tag.component.css"]
})
export class FilterMovieTagComponent implements OnInit {
  @Input() public allMovieTags: MovieTagModel[];
  @Output() public changeEventUseFilterData = new EventEmitter<CollectionMovieTagModel>();
  @Output() public changeEventClearFilterData = new EventEmitter();

  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit(): Promise<void> {
    this.formGroup = this.formBuilder.group({
      movieTags: new FormControl([]),
    });
  }

  compareByValue(a: MovieTagModel, b: MovieTagModel): boolean {
    return a.idMovieTag === b.idMovieTag;
  }

  getMovieTagsValue(): MovieTagModel[] {
    return this.formGroup.get("movieTags").value;
  }

  async onSubmitFilter(): Promise<void> {
    const movieTagsValue = this.getMovieTagsValue();
    const collectionMovieTag: CollectionMovieTagModel = {
      movieTags: movieTagsValue,
    };
    !!movieTagsValue.length ? this.changeEventUseFilterData.emit(collectionMovieTag) :  this.changeEventClearFilterData.emit();
  }

  async onClearFilter(event: MouseEvent): Promise<void> {
    const movieTagsValue = this.getMovieTagsValue();
    event.stopPropagation();
    if (!!movieTagsValue.length) {
      this.formGroup.patchValue({
        movieTags: [],
      });
      this.changeEventClearFilterData.emit();
    }
  }

}
