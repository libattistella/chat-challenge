import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ChannelService } from '../channel/channel.service';
import { AuthService } from '../auth/auth.service';
import { Page404Component } from './page404/page404.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    Page404Component
  ],
  exports: [
    Page404Component,
    HeaderComponent,
    AppRoutingModule
  ],
  providers: [
    ChannelService,
    AuthService
  ]
})
export class CoreModule { }
