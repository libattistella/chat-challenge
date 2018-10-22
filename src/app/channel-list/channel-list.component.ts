import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Channel } from '../channel/channel.model';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {

  }

  onSelectChannel() {
    // this.router.navigate(['/channel', channel._id]);
  }

}
