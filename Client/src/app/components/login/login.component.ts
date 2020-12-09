import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { LoginUserModel } from "../../models/login-user.model";
import { AppRoutingService } from "../../routers/app-routing.service";
import { LOGIN_ERROR_TEXT, LOGIN_MIN_LENGTH, PASSWORD_ERROR_TEXT, PASSWORD_PATTERN } from "../../const";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
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
      login: ["", [Validators.required, Validators.minLength(LOGIN_MIN_LENGTH)]],
      password: ["", [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
    });
  }

  get login(): AbstractControl {
    return this.formGroup.get("login");
  }

  get password(): AbstractControl {
    return this.formGroup.get("password");
  }

  getLoginErrorMessage(): string {
    if (this.login.hasError("required")) {
      return "Поле логина обязательно к заполнению";
    }

    return this.login.hasError("minlength") ? LOGIN_ERROR_TEXT : "";
  }

  getPasswordErrorMessage(): string {
    if (this.password.hasError("required")) {
      return "Поле пароля обязательно к заполнению";
    }

    return this.password.hasError("pattern") ? PASSWORD_ERROR_TEXT : "";
  }

  onClickRegisterPage(): void {
    this.appRoutingService.goToRegisterPage();
  }

  async onSubmit(): Promise<void> {
    const value = this.formGroup.value;
    const data = new LoginUserModel().deserialize(value);

    await this.authService.loginUser(data);
  }
}
