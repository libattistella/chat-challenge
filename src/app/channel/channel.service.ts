import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';

import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { Channel } from './channel.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private channelsURL = 'http://localhost:3000/api/channels';

  private channels: Channel[];

  private channelsChanged = new Subject<Channel[]>();

  constructor(private sharedSvc: SharedService,
              private http: HttpClient) { }

  getChannels() {

    // const token = this.authSvc.getToken();
    const headers = this.sharedSvc.getHeadersJSON();
    // headers.append('Authorization', `Bearer ${token}`);

    return this.http.get('http://localhost:3000/api/channels', { headers: headers }).pipe(map(
      (response) => {
        // if (response && response.status === 200 && response.json()) {
        //   this.channels = response.json();
        //   this.channelsChanged.next(this.channels.slice());
        // }
        return response;
      },
      (err) => {
        console.log('err', err);
        return err;
      }), catchError(
        (err) => {
          console.log('catch', err);
          return throwError(err);
        }));
  }

  public getChannelsChanged() {
    return this.channelsChanged;
  }
}
