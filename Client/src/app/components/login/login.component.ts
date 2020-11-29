import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

  onClickRegisterPage(): void {
    this.appRoutingService.goToRegisterPage();
  }

  async onSubmit(): Promise<void> {
    const value = this.formGroup.value;
    const data = new LoginUserModel().deserialize(value);

    await this.authService.loginUser(data);
    this.appRoutingService.goToUserPage();
  }
}
