import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

const authRoutes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signin', component: SignInComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AuthRoutingModule { }
