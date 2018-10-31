import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Chat } from './chat.model';
import * as io from 'socket.io-client';
import { AuthService } from '../../auth/auth.service';
import { ChannelService } from '../channel.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserDetails } from 'src/app/auth/auth.model';
import { Router } from '@angular/router';
import { Channel } from '../channel.model';
import { element } from 'protractor';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  @Input() channelId: String;
  @Input() channel: Channel;
  private chats: Chat[] = [];
  @ViewChild('scrollChat') private chatScrollContainer: ElementRef;
  private reversed: Chat[] = [];
  private user: UserDetails;
  chatForm: FormGroup;
  socket = io('http://localhost:3000');

  private newChat: any;
  private disconnectedChannel: Channel = {
    _id: '',
    name: '',
    connectedUsers: [],
    chats: []
  };
  private usersTyping: any[] = [];

  constructor(private authSvc: AuthService,
              private channelSvc: ChannelService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.authSvc.getUserDetails();

    this.chatForm = new FormGroup({
      'message': new FormControl('')
    });

    this.chatForm.controls['message'].valueChanges.subscribe(
      (message) => {
        if (message !== null) {
          if (message !== '') {
            this.socket.emit('user-start-typing', { channel: this.channelId, user: this.user });
          } else {
            this.socket.emit('user-stop-typing', { channel: this.channelId, user: this.user });
          }
        }
      }
  );

  this.channelSvc.getChatsByChannel(this.channelId).subscribe((chats) => {
    (<any>Object).assign(this.reversed, chats);
    (<any>Object).assign(this.chats, this.reversed.reverse());
    this.scrollToBottom();
  },
  (err) => {
    console.log(err);
  });

  this.socket.on('new-message', function(chat) {
    if (chat.channel === this.channelId) {
      this.chats.push(chat);
      this.newChat = null;
      this.scrollToBottom();
    }
  }.bind(this));

  this.socket.on('user-on', function(data) {
    if (data.channel._id === this.channelId) {
      const fakeChat: Chat = {
        _id: 'fake',
        channel: this.channelId,
        user: data.user,
        message: data.user.nickname + ' has joined the chat',
        created_at: new Date()
      };
      this.chats.push(fakeChat);
      // console.log('User has connected', data.user);
      this.scrollToBottom();
    }
  }.bind(this));

  this.socket.on('user-off', function(data) {
    if (data.channel._id === this.channelId) {
      const fakeChat: Chat = {
        _id: 'fake',
        channel: this.channelId,
        user: data.user,
        message: data.user.nickname + ' has left the chat',
        created_at: new Date()
      };
      this.chats.push(fakeChat);
      // console.log('User has disconnected', data.user);
      this.scrollToBottom();
    }
  }.bind(this));

  this.socket.on('some-user-start-typing', function(data) {
    if (data.channel === this.channelId) {
      // console.log(data.user.nickname + ' start typing...');
      if (this.user._id !== data.user._id) {
        this.addUserTyping(this.usersTyping, data);
      }
    }
  }.bind(this));

  this.socket.on('some-user-stop-typing', function(data) {
    if (data.channel === this.channelId) {
      // console.log(data.user.nickname + ' stop typing...');
      this.removeUserTyping(this.usersTyping, data);
    }
  }.bind(this));
}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  sendMessage() {

    if (this.chatForm.value.message !== null && this.chatForm.value.message) {
      this.newChat = {
        channel: this.channelId,
        user: this.user._id,
        message: this.chatForm.value.message
      };

      this.channelSvc.saveChat(this.newChat).subscribe((res) => {
        this.newChat = null;
        this.chatForm = new FormGroup({
          'message': new FormControl('')
        });
        // console.log('save-message', res);
        this.socket.emit('user-stop-typing', { channel: this.channelId, user: this.user });
        this.socket.emit('save-message', res);
      },
      (err) => {
        console.log(err);
      });
    }
  }

  onDisconnect() {
    this.channelSvc.disconnectUserFromChannel(this.channel).subscribe((res) => {
      (<any>Object).assign(this.disconnectedChannel, res);
      this.socket.emit('disconnect-user', { channel: this.disconnectedChannel, user: this.user });
      // console.log('disconnect-user', this.disconnectedChannel.connectedUsers);
      this.router.navigate(['/channel']);
    },
    (err) => {
      console.log(err);
    });
  }

  private addUserTyping(array, obj) {

    const index = array.findIndex( elem => elem.user._id === obj.user._id );
    if (index === -1) {
      array.push(obj);
    }
  }

  private removeUserTyping(array, obj) {

    const index = array.findIndex( elem => elem.user._id === obj.user._id );
    if (index !== -1) {
      array.splice(index, 1);
    }
  }
}
