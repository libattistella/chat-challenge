import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authSvc: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authSvc.isLoggedIn();
  }

  onLogout() {
    this.authSvc.logout().subscribe(
      (res) => {
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
