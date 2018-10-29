import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user.model';
import { UserDetails } from '../../../auth/auth.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: User;
  private userDetails: UserDetails;

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    this.userDetails = this.authSvc.getUserDetails();
  }

}
