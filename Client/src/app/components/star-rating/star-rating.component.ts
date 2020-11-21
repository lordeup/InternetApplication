import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-star-rating",
  templateUrl: "./star-rating.component.html",
  styleUrls: ["./star-rating.component.css"],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {
  @Input() rating: number;
  @Input() starCount: number;

  @Output() ratingUpdated = new EventEmitter<number>();

  public ratings: number[] = [];

  ngOnInit(): void {
    for (let index = 1; index <= this.starCount; ++index) {
      this.ratings.push(index);
    }
  }

  onClick(rating: number): void {
    this.ratingUpdated.emit(rating);
  }

  showIcon(count: number): string {
    const isInt = this.rating % 1 === 0;
    const isNextRating = this.rating + 1 > count;

    if (this.rating >= count) {
      return "star";
    } else if (!isInt && isNextRating) {
      return "star_half";
    }  else {
      return "star_border";
    }
  }
}
