import { Component, OnInit, Input } from '@angular/core';
import { User } from './user.model';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() users: User[];
  @Input() channelId: String;
  socket = io('http://localhost:3000');

  constructor() { }

  ngOnInit() {

    this.socket.on('user-on', function(data) {
      console.log('user-on', data);
      if (data.channel._id === this.channelId) {
        this.users = data.channel.connectedUsers;
        console.log('Added user', this.users);
        // this.scrollToBottom();
      }
    }.bind(this));

    this.socket.on('user-off', function(data) {
      console.log('user-off', data);
      if (data.channel._id === this.channelId) {
        this.users = data.channel.connectedUsers;
        console.log('Erased user', this.users);
        // this.scrollToBottom();
      }
    }.bind(this));
  }

}
