import { Component, OnInit } from '@angular/core';
import { ChannelService } from './channel.service';
import { Chat } from './chat/chat.model';
import { User } from './users/user.model';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  private chats: Chat[];
  private connectedUsers: User[];

  constructor(private channelSvc: ChannelService) { }

  ngOnInit() {
    this.channelSvc.getChannel().subscribe((channel) => {
      // this.channels = channels;
      // (<any>Object).assign(this.chats, channel.chats);
    },
    (err) => {
      console.log(err);
    });
  }

}
