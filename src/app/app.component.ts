import { Component, HostListener } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-challenge';

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    this.authSvc.disconnectUserFromEveryChannelSync();
  }

  constructor(private authSvc: AuthService) {}
}
