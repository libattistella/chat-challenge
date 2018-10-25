import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { TokenPayload } from '../auth.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  private credentials: TokenPayload = {
    nickname: '',
    password: ''
  };

  constructor(private authSvc: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  onSignup() {
    this.authSvc.register(this.credentials).subscribe(() => {
      this.router.navigate(['channel']);
    }, (err) => {
      console.error(err);
    });
  }

}
