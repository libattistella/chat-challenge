import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChatComponent, UsersComponent]
})
export class ChannelModule { }
