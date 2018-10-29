import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChannelService } from './channel.service';
import { Chat } from './chat/chat.model';
import { User } from './users/user.model';
import { PlatformLocation } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel } from './channel.model';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit, OnDestroy {

  private channelId: String;
  private channel: Channel = {
    _id: '',
    name: '',
    connectedUsers: [],
    chats: []
  };
  private querySub: Subscription;

  constructor(private channelSvc: ChannelService,
              private location: PlatformLocation,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.querySub = this.route.queryParams.subscribe(
      (param) => {
        this.channelId = param['channel_id'];
        this.channelSvc.getChannel(this.channelId).subscribe((channel) => {
          (<any>Object).assign(this.channel, channel);
        },
        (err) => {
          console.log(err);
        });
      });

    this.location.onPopState(() => {
      this.onDisconnect();
    });
  }

  ngOnDestroy() {
    this.querySub.unsubscribe();
  }

  onDisconnect() {
    this.channelSvc.disconnectUserFromChannel(this.channel).subscribe((res) => {
      // console.log(res);
      this.router.navigate(['/channel']);
    },
    (err) => {
      console.log(err);
    });
  }

}
