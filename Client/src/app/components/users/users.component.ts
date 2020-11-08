import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { AppRoutingService } from "../../routers/app-routing.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private appRoutingService: AppRoutingService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      console.log("users", response);
    }, error => {
      alert(error.error?.message || error.message);
    });
  }
}
