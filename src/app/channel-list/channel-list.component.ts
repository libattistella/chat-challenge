import { Component, OnInit, OnDestroy } from '@angular/core';
import { Channel } from '../channel/channel.model';
import { ChannelService } from '../channel/channel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit, OnDestroy {

  private channels: Channel[] = [];
  private channelsChanged: Subscription;

  constructor(private channelSvc: ChannelService) {}

  ngOnInit() {
    this.channelsChanged = this.channelSvc.getChannelsChanged().subscribe((channels: Channel[]) => {
      this.channels = channels;
    },
    (err) => {
      console.log(err);
    });

    this.channelSvc.getChannels().subscribe((channels) => {
      // this.channels = channels;
      (<any>Object).assign(this.channels, channels);
    },
    (err) => {
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.channelsChanged.unsubscribe();
  }
}
