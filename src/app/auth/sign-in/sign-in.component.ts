import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenPayload } from '../auth.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  credentials: TokenPayload = {
    nickname: '',
    password: ''
  };
  incorrect: Boolean = false;

  constructor(private authSvc: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSignin() {
    this.authSvc.login(this.credentials).subscribe(() => {
      this.router.navigate(['channel']);
    }, (err) => {
      this.incorrect = true;
      console.error(err);
    });
  }

}
