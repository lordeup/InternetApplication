import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      login: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  getErrorLogin() {
    return this.formGroup.get('login').hasError('required') ? 'This field is required' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'This field is required' : '';
  }

  onSubmit(): void {
    const value = this.formGroup.value;
    console.log("value", value);
  }
}
