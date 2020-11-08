import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { REQUIRED_TITLE_ERROR } from "src/app/const";
import { AuthService } from "src/app/services/auth.service";
import { RegisterUser } from "../../models/register-user.model";
import { AppRoutingService } from "../../routers/app-routing.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;

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

  onSubmit(): void {
    const value = this.formGroup.value;
    const data = new RegisterUser().deserialize(value);

    this.authService.registerUser(data).subscribe(response => {
      this.appRoutingService.goToUserPage();
    }, error => {
      alert(error.error?.message || error.message);
    });
  }
}
