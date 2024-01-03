import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from '../components/signup/signup.component';
import { LoginComponent } from '../components/login/login.component';
import { ChatdashboardComponent } from '../components/chatdashboard/chatdashboard.component';
import { ForgotpasswordComponent } from '../components/forgotpassword/forgotpassword.component';
import { NewPasswordComponent } from '../components/new-password/new-password.component';

const routes: Routes = [
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "forgot-password", component: ForgotpasswordComponent},
  {path: "new-password/:pass_key", component: NewPasswordComponent},
  {path: "", component: ChatdashboardComponent},
  {path: '**', redirectTo: "", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
