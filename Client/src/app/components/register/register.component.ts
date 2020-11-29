import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
      login: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      name: "",
      surname: "",
    });
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
