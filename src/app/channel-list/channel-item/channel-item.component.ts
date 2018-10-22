import { Component, OnInit, Input } from '@angular/core';
import { Channel } from 'src/app/channel/channel.model';

@Component({
  selector: 'app-channel-item',
  templateUrl: './channel-item.component.html',
  styleUrls: ['./channel-item.component.css']
})
export class ChannelItemComponent implements OnInit {

  @Input() channelItem: Channel;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
