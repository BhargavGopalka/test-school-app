import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {API} from '../../utility/constants/constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  emailErrorMessage: string;
  passwordErrorMessage: string;

  constructor(private apiManager: ApiManagerService,
              private routes: Router) {
  }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('smartsensetab@gmail.com', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50)
        ]
      }),
      password: new FormControl('aaaaaa', {validators: [Validators.required, Validators.minLength(6), Validators.maxLength(50)]})
    });
  }

  emailValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required === true) {
        return this.emailErrorMessage = 'Email is required';
      }
      if ((control.value.length < 6) || (control.value.length > 50)) {
        return this.emailErrorMessage = 'Email length between 6 to 50';
      }
    }
  }

  passwordValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required === true) {
        return this.passwordErrorMessage = 'Password is required';
      }
      if ((control.value.length < 6) || (control.value.length > 50)) {
        return this.passwordErrorMessage = 'Password length between 6 to 50';
      }
    }
  }

  onSubmitLoginForm(formValue, valid) {
    if (valid === true) {
      this.apiManager.postPublicAPI(API.LOGIN, formValue)
        .subscribe((response) => {
            console.log(response);
            const token = response.payload.token;
            sessionStorage.setItem('Authorization', 'bearer ' + token);
            if (response.status === 200) {
              this.routes.navigate(['dashboard']);
            }
          },
          error => {
            console.log(error);
          });
    }
  }

}
