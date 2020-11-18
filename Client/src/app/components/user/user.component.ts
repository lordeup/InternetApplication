import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { UserModel } from "../../models/user.model";
import { MatDialog } from "@angular/material/dialog";
import { DialogTitle } from "../../models/dialog-title";
import { DialogUserComponent, IDialogUserData } from "../dialog-user/dialog-user.component";
import { ReviewService } from "../../services/review.service";
import { Id } from "../../models/id";
import { MovieModel } from "../../models/movie.model";
import { AppRoutingService } from "../../routers/app-routing.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  user: UserModel;
  reviewMovies: MovieModel[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private reviewService: ReviewService,
    private appRoutingService: AppRoutingService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  onClickMovie(id: Id): void {
    this.appRoutingService.goToMoviePage(id);
  }

  onClickUserEdit(): void {
    const data: IDialogUserData = {
      title: DialogTitle.Edit,
      user: this.user,
    };
    const dialogRef = this.dialog.open(DialogUserComponent, {data, autoFocus: false});
    dialogRef.afterClosed().subscribe(response => {
        !!response && this.updateUser(response);
      }
    );
  }

  getCurrentUser(): void {
    if (this.authService.isAuthenticated()) {
      const id = this.authService.getIdUserFromLocalStorage();

      this.userService.getUser(id).subscribe(response => {
        this.user = response;
        this.getReviewMoviesByIdUser(this.user.idUser);
      }, error => {
        alert(error.error?.message || error.message);
      });
    }
  }

  updateUser(data: UserModel): void {
    this.userService.updateUser(data).subscribe(() => {
      this.getCurrentUser();
    }, error => {
      alert(error.error?.message || error.message);
    });
  }

  getReviewMoviesByIdUser(id: Id): void {
    this.reviewService.getReviewMoviesByIdUser(id).subscribe(response => {
      this.reviewMovies = response;
      console.log("getReviewMoviesByIdUser", response);
    }, error => {
      alert(error.error?.message || error.message);
    });
  }
}
