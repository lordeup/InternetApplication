import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { REQUIRED_TITLE_ERROR } from "src/app/const";
import { AuthService } from "src/app/services/auth.service";
import { LoginUserModel } from "../../models/login-user.model";
import { AppRoutingService } from "../../routers/app-routing.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private appRoutingService: AppRoutingService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  getErrorLogin(): string {
    return this.formGroup.get("login").hasError("required") ? REQUIRED_TITLE_ERROR : "";
  }

  getErrorPassword(): string {
    return this.formGroup.get("password").hasError("required") ? REQUIRED_TITLE_ERROR : "";
  }

  onClickRegisterPage(): void {
    this.appRoutingService.goToRegisterPage();
  }

  onSubmit(): void {
    const value = this.formGroup.value;
    const data = new LoginUserModel().deserialize(value);

    this.authService.loginUser(data).subscribe(() => {
      this.appRoutingService.goToUserPage();
    }, error => {
      alert(error.error?.message || error.message);
    });
  }
}
