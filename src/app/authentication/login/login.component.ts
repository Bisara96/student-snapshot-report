import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  get usernameCtrl(): FormControl {
    return this.formGroup.get('usernameCtrl') as FormControl;
  }

  get passwordCtrl(): FormControl {
    return this.formGroup.get('passwordCtrl') as FormControl;
  }

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    this.formGroup = this.formBuilder.group({
      usernameCtrl: ['', [Validators.required]],
      passwordCtrl: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/report');
    }
  }

  cancel() {
    this.formGroup.reset();
  }

  async login() {
    if (this.formGroup.valid) {
      try {
        await this.authenticationService.login(this.usernameCtrl.value, this.passwordCtrl.value);
        this.router.navigateByUrl('/report');
      } catch {
        this.cancel();
      }
    } else {
      this.formGroup.markAllAsTouched();
      this.usernameCtrl.markAllAsTouched();
      this.passwordCtrl.markAllAsTouched();
    }
  }

}
