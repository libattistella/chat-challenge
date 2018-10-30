import { Component, OnInit, Input } from '@angular/core';
import { Channel } from 'src/app/channel/channel.model';
import { ChannelService } from '../../channel/channel.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-channel-item',
  templateUrl: './channel-item.component.html',
  styleUrls: ['./channel-item.component.css']
})
export class ChannelItemComponent implements OnInit {

  @Input() channelItem: Channel;
  @Input() index: number;
  private connectedChannel: Channel = {
    _id: '',
    name: '',
    connectedUsers: [],
    chats: []
  };
  socket = io('http://localhost:3000');

  constructor(private router: Router,
              private route: ActivatedRoute,
              private channelSvc: ChannelService) { }

  ngOnInit() {
  }

  onConnect() {
    // Add this user to the connected users of this channel
    this.channelSvc.connectUserToChannel(this.channelItem).subscribe((res) => {
      (<any>Object).assign(this.connectedChannel, res);
      this.socket.emit('connect-user', this.connectedChannel);
      console.log('connect-user', this.connectedChannel.connectedUsers);
      this.router.navigate([this.index], { relativeTo: this.route, queryParams: { 'channel_id': this.channelItem._id }});
    },
    (err) => {
      console.log(err);
    });
  }

}
