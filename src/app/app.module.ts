import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { ChannelModule } from './channel/channel.module';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { ChannelItemComponent } from './channel-list/channel-item/channel-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ChannelListComponent,
    ChannelItemComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AuthModule,
    ChannelModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
