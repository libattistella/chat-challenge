import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { ChannelComponent } from './channel.component';
import { UserItemComponent } from './users/user-item/user-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChannelComponent,
    ChatComponent,
    UsersComponent,
    UserItemComponent
  ]
})
export class ChannelModule { }
