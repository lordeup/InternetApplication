import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { AppRoutingService } from "../../routers/app-routing.service";
import { User } from "../../models/user.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { REQUIRED_TITLE_ERROR } from "../../const";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"]
})
export class UserEditComponent implements OnInit {
  user: User;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private appRoutingService: AppRoutingService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    console.log("!!!!!!!!", this.user);
    this.formGroup = this.formBuilder.group({
      login: [this.user?.login || "", Validators.required],
      password: "",
      name: this.user?.name || "",
      surname: this.user?.surname || "",
      pictureUrl: this.user?.pictureUrl || "",
    });
  }

  getErrorLogin(): string {
    return this.formGroup.get("login").hasError("required") ? REQUIRED_TITLE_ERROR : "";
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

  onSubmit(): void {
    const value = this.formGroup.value;
    const data = new User().deserialize(value);
    console.log("data", data);

    // this.userService.updateUser(data).subscribe(response => {
    //   this.appRoutingService.goToUserPage();
    // }, error => {
    //   alert(error.error?.message || error.message);
    // });

  }

}
