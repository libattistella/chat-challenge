import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { ChannelComponent } from './channel.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ChannelComponent,
    ChatComponent,
    UsersComponent,
    UserItemComponent
  ]
})
export class ChannelModule { }
