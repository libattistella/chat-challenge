import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { RequestOptions, RequestMethod, Http, Response, URLSearchParams } from '@angular/http';

import { map, catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Channel } from './channel.model';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private channelsURL = 'http://localhost:3000/channels';

  private channels: Channel[];

  private channelsChanged = new Subject<Channel[]>();

  constructor(private sharedSvc: SharedService,
              private http: Http) { }

  getChannels() {
    // const token = this.authSvc.getToken();
    const headers = this.sharedSvc.getHeadersJSON();
    // headers.append('Authorization', `Bearer ${token}`);

    const options = new RequestOptions({ method: RequestMethod.Get, headers: headers });
    return this.http.get(this.channelsURL, options).pipe(map(
      (response: Response) => {
        if (response && response.status === 200 && response.json()) {
          this.channels = response.json();
          this.channelsChanged.next(this.channels.slice());
        }
        return response;
      },
      (err) => {
        console.log(err);
        return err;
      }), catchError(
        (err) => {
          console.log(err);
          return Observable.throw(err);
        }));
  }

  public getChannelsChanged() {
    return this.channelsChanged;
  }
}
