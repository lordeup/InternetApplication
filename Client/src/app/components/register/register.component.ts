import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { RegisterUserModel } from "../../models/register-user.model";
import { AppRoutingService } from "../../routers/app-routing.service";
import { LOGIN_ERROR_TEXT, PASSWORD_ERROR_TEXT, PASSWORD_PATTERN } from "../../const";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private appRoutingService: AppRoutingService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      login: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      name: "",
      surname: "",
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

  onClickLoginPage(): void {
    this.appRoutingService.goToLoginPage();
  }

  async onSubmit(): Promise<void> {
    const value = this.formGroup.value;
    const data = new RegisterUserModel().deserialize(value);

    await this.authService.registerUser(data);
    this.appRoutingService.goToUserPage();
  }
}
