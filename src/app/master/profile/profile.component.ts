import {Component, OnInit} from '@angular/core';
import {Profile} from './profile.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {API, IMAGEURLS} from '../../utility/constants/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  adminData: Profile;

  profileForm: FormGroup;
  passwordForm: FormGroup;
  filesToUpload: any;
  image_url = '';

  firstNameErrorMessage: string;
  lastNameErrorMessage: string;
  mobileErrorMessage: string;
  emailErrorMessage: string;
  oldPasswordErrorMessage: string;
  newPasswordErrorMessage: string;
  confirmPasswordErrorMessage: string;
  passwordConfirm: boolean;
  cPass = '';

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.adminData = JSON.parse(atob(sessionStorage.getItem('User')));
    this.image_url = this.adminData.image ? (IMAGEURLS.USER + this.adminData.image) : 'assets/img/profilePlaceholder.jpg';
    this.createProfileForm(this.adminData);
    this.createPasswordForm();
  }

  createProfileForm(admin) {
    this.profileForm = new FormGroup({
      firstName: new FormControl(admin.firstName, Validators.required),
      lastName: new FormControl(admin.lastName, Validators.required),
      email: new FormControl(admin.email, Validators.required),
      mobileNumber: new FormControl(admin.mobileNumber, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      })
    });
  }

  createPasswordForm() {
    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(50)]
      }),
      newPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(50)]
      }),
      confirmPassword: new FormControl('')
    });
  }

  firstNameValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required) {
        return this.firstNameErrorMessage = 'First name is required';
      }
    }
  }

  lastNameValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required) {
        return this.lastNameErrorMessage = 'Last name is required';
      }
    }
  }

  mobileValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required) {
        return this.mobileErrorMessage = 'Mobile Number is required';
      }
      if ((control.value.length < 10) || (control.value.length > 10)) {
        return this.mobileErrorMessage = 'Mobile Number must be of exact 10 digits long';
      }
    }
  }

  emailValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required) {
        return this.emailErrorMessage = 'Email is required';
      }
    }
  }

  oldPasswordValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required) {
        return this.oldPasswordErrorMessage = 'Old password is required';
      }
      if ((control.value.length < 6) || (control.value.length > 50)) {
        return this.oldPasswordErrorMessage = 'Password length between 6 to 50';
      }
    }
  }

  newPasswordValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required) {
        return this.newPasswordErrorMessage = 'New password is required';
      }
      if ((control.value.length < 6) || (control.value.length > 50)) {
        return this.newPasswordErrorMessage = 'Password length between 6 to 50';
      }
    }
  }

    onUpdateAdminData(value, valid) {
    if (valid) {
      this.apiManager.putAPI(API.UPDATE_ADMIN, value, this.filesToUpload)
        .subscribe((response) => {
          this.adminData = response.payload.data;
          this.createProfileForm(this.adminData);
          const updateAdmin = JSON.stringify(response.payload.data);
          sessionStorage.setItem('User', btoa(updateAdmin));
        });
    }
  }

  onUpdateAdminPassword(value, valid) {
    if (valid && this.passwordConfirm === true) {
      this.apiManager.putAPI(API.CHANGE_PASSWORD, value)
        .subscribe((response) => {
          this.cPass = null;
          this.createPasswordForm();
        });
    }
  }

  confirmPassValidation() {
    const newPasswordValue = this.passwordForm.get('newPassword').value;
    const confirmPasswordValue = this.passwordForm.get('confirmPassword').value;
    if (newPasswordValue === confirmPasswordValue) {
      this.passwordConfirm = true;
      return null;
    } else {
      this.passwordConfirm = false;
      return this.confirmPasswordErrorMessage = `Confirm password doesn't match`;
    }
  }

  /*checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return this.confirmPasswordErrorMessage = `Confirm password doesn't match`;
      } else {
        return null;
      }
    };
  }*/

  // confirmPasswordValidation(value) {
  //   const newPasswordValue = this.passwordForm.get('newPassword').value;
  //   if (newPasswordValue === value) {
  //     this.passwordConfirm = true;
  //     return null;
  //   } else {
  //     this.passwordConfirm = false;
  //     return this.confirmPasswordErrorMessage = `Confirm password doesn't match`;
  //   }
  // }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (loadEvent: any) => {
      this.image_url = loadEvent.target.result;
    };
    reader.readAsDataURL(file);
    this.filesToUpload = fileList;
  }

  onCancelProfileForm() {
    this.createProfileForm(this.adminData);
  }

  onCancelPasswordForm() {
    this.createPasswordForm();
    this.cPass = null;
    this.confirmPasswordErrorMessage = '';
  }

}
