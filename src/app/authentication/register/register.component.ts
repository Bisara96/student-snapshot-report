import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;

  get usernameCtrl(): FormControl {
    return this.formGroup.get('usernameCtrl') as FormControl;
  }

  get passwordCtrl(): FormControl {
    return this.formGroup.get('passwordCtrl') as FormControl;
  }

  get confPasswordCtrl(): FormControl {
    return this.formGroup.get('confPasswordCtrl') as FormControl;
  }

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    this.formGroup = this.formBuilder.group({
      usernameCtrl: ['', [Validators.required, this.usernameUniqueValidator]],
      passwordCtrl: ['', [Validators.required]],
      confPasswordCtrl: ['', []]
    }, { validator: this.passwordValidator })
  }

  passwordValidator = (formGroup: FormGroup) => {
    const { passwordCtrl, confPasswordCtrl } = formGroup.controls;
    
    if ((passwordCtrl.touched || passwordCtrl.dirty) && passwordCtrl.value) {
      if (passwordCtrl.value !== confPasswordCtrl.value) {
        confPasswordCtrl.setErrors({ notMatching: true });
        confPasswordCtrl.markAllAsTouched();
      } else {
        confPasswordCtrl.setErrors(null);
      }
    }
  }

  usernameUniqueValidator = (formControl: FormControl) => {
    if (formControl.value && !this.authenticationService.usernameAvailable(formControl.value)) {
      return {
        usernameExist: {
          valid: false
        }
      }
    }

    return null;
  }

  cancel() {
    this.formGroup.reset();
  }

  ngOnInit(): void {
    this.authenticationService.logout();
  }

  async register() {
    if (this.formGroup.valid) {
      await this.authenticationService.registerNewUser(this.usernameCtrl.value, this.passwordCtrl.value);
      this.router.navigate(['/login']);
    } else {
      this.formGroup.markAllAsTouched();
      this.usernameCtrl.markAllAsTouched();
      this.passwordCtrl.markAllAsTouched();
    }
  }

}
