import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { ChannelComponent } from './channel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChannelComponent,
    ChatComponent,
    UsersComponent
  ]
})
export class ChannelModule { }
