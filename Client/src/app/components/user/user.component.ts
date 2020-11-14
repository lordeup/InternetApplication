import { Component, OnInit } from "@angular/core";
import { AppRoutingService } from "../../routers/app-routing.service";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { UserModel } from "../../models/user.model";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  user: UserModel;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private appRoutingService: AppRoutingService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  onClickUserEdit(): void {
    this.appRoutingService.goToUserEditPage();
  }

  getCurrentUser(): void {
    if (this.authService.isAuthenticated()) {
      const id = this.authService.getIdUserFromLocalStorage();

      this.userService.getUser(id).subscribe(response => {
        this.user = response;
        console.log("user", response);
      }, error => {
        alert(error.error?.message || error.message);
      });
    }
  }
}
