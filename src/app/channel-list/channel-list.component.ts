import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Channel } from '../channel/channel.model';
import { ChannelService } from '../channel/channel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit, OnDestroy {

  private channels: Channel[];
  private channelsChanged: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private channelSvc: ChannelService) {}

  ngOnInit() {
    this.channelsChanged = this.channelSvc.getChannelsChanged().subscribe((channels: Channel[]) => {
      this.channels = channels;
    },
    (err) => {
      console.log('Error', err);
    });

    this.channelSvc.getChannels();
  }

  ngOnDestroy() {
    this.channelsChanged.unsubscribe();
  }

  onSelectChannel() {
    // this.router.navigate(['/channel', channel._id]);
  }

}
