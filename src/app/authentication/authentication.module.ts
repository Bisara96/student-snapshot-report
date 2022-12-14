import { RouterModule } from '@angular/router';
import { MaterialsModule } from './../materials/materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialsModule,
    RouterModule
  ]
})
export class AuthenticationModule { }
