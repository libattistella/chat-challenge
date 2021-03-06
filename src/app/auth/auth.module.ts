import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SignInComponent,
    SignUpComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
