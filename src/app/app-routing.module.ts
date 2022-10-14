import { AuthenticationGuard } from './authentication/authentication.guard';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { SnapshotReportComponent } from './snapshot-report/snapshot-report.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'report', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'report', component: SnapshotReportComponent, canActivate: [AuthenticationGuard]},
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
