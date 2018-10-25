import { Component, OnInit, Input } from '@angular/core';
import { Chat } from './chat.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() chats: Chat[];

  constructor() { }

  ngOnInit() {
  }

}
