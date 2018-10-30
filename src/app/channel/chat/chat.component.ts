import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Chat } from './chat.model';
import * as io from 'socket.io-client';
import { AuthService } from '../../auth/auth.service';
import { ChannelService } from '../channel.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserDetails } from 'src/app/auth/auth.model';
import { Router } from '@angular/router';
import { Channel } from '../channel.model';

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

  constructor(private authSvc: AuthService,
              private channelSvc: ChannelService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.authSvc.getUserDetails();

    this.chatForm = new FormGroup({
      'message': new FormControl('')
    });

    this.channelSvc.getChatsByChannel(this.channelId).subscribe((chats) => {
      (<any>Object).assign(this.reversed, chats);
      (<any>Object).assign(this.chats, this.reversed.reverse());
      console.log('Chats for this channel', this.chats);
      this.scrollToBottom();
    },
    (err) => {
      console.log(err);
    });

    this.socket.on('new-message', function(chat) {
      if (chat.channel === this.channelId) {
        this.chats.push(chat);
        console.log('Chats for this channel onNewMessage', this.chats);
        this.newChat = null;
        this.scrollToBottom();
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
        console.log('save-message', res);
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
      this.socket.emit('disconnect-user', this.disconnectedChannel);
      console.log('disconnect-user', this.disconnectedChannel.connectedUsers);
      this.router.navigate(['/channel']);
    },
    (err) => {
      console.log(err);
    });
  }

}
