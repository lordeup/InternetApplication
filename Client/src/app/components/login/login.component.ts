import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REQUIRED_TITLE_ERROR } from "src/app/const";
import { AuthService } from "src/app/services/auth.service";
import { LoginUser } from "../../models/login-user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      login: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  getErrorLogin() {
    return this.formGroup.get('login').hasError('required') ? REQUIRED_TITLE_ERROR : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? REQUIRED_TITLE_ERROR : '';
  }

  onSubmit(): void {
    const value = this.formGroup.value;
    const data = new LoginUser().deserialize(value);

    this.authService.loginUser(data);
  }
}
