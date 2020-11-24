import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { REQUIRED_TITLE_ERROR } from "src/app/const";
import { AuthService } from "src/app/services/auth.service";
import { RegisterUserModel } from "../../models/register-user.model";
import { AppRoutingService } from "../../routers/app-routing.service";

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
      login: ["", Validators.required],
      password: ["", Validators.required],
      name: "",
      surname: "",
    });
  }

  getErrorLogin(): string {
    return this.formGroup.get("login").hasError("required") ? REQUIRED_TITLE_ERROR : "";
  }

  getErrorPassword(): string {
    return this.formGroup.get("password").hasError("required") ? REQUIRED_TITLE_ERROR : "";
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
