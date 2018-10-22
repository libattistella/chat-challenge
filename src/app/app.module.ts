import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { ChannelModule } from './channel/channel.module';
import { ChannelListComponent } from './channel-list/channel-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ChannelListComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    AuthModule,
    ChannelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
