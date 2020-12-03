import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-star-rating",
  templateUrl: "./star-rating.component.html",
  styleUrls: ["./star-rating.component.css"],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {
  @Input() public rating: number;
  @Input() public starCount: number;

  @Output() ratingUpdated = new EventEmitter<number>();

  public ratings: number[] = [];
  public color: StarRatingColor;
  public localRating: number;

  ngOnInit(): void {
    for (let index = 1; index <= this.starCount; ++index) {
      this.ratings.push(index);
    }
    this.color = StarRatingColor.Primary;
  }

  onClick(rating: number): void {
    this.ratingUpdated.emit(rating);
    // this.localRating = rating;
    // this.color = StarRatingColor.Accent;
  }

  onMouseOver(event: MouseEvent, rating: number): void {
    this.localRating = this.rating;
    // this.rating = rating;
    this.color = StarRatingColor.Accent;
  }

  onMouseOut(event: MouseEvent): void {
    // this.rating = this.localRating;
    this.color = StarRatingColor.Primary;
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

export enum StarRatingColor {
  Primary = "primary",
  Accent = "accent",
  Warn = "warn"
}
