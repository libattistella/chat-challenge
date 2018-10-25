import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable, Subject } from 'rxjs';
import { Channel } from './channel.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  private channelsURL = 'http://localhost:3000/api/channels';

  private channels: Channel[];

  private channelsChanged = new Subject<Channel[]>();

  constructor(private http: HttpClient,
              private authSvc: AuthService) { }

  getChannels() {

    const token = this.authSvc.getToken();
    return this.http.get('/api/channels', { headers: { Authorization: `Bearer ${token}` }}).pipe(map(
      (response) => {
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

  getChannelsChanged() {
    return this.channelsChanged;
  }

  getChannel(channel: String) {

    console.log('Channel ID:', channel);
    const token = this.authSvc.getToken();
    return this.http.get('/api/channels/' + channel, { headers: { Authorization: `Bearer ${token}` }}).pipe(map(
      (response) => {
        console.log('Channel:', response);
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

  connectUserToChannel(channel: Channel) {

    const token = this.authSvc.getToken();
    return this.http.post('/api/channels/connect', channel, { headers: { Authorization: `Bearer ${token}` }}).pipe(map(
      (response) => {
        console.log(response);
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

  disconnectUserFromChannel(channel: Channel) {

    const token = this.authSvc.getToken();
    return this.http.post('/api/channels/disconnect', channel, { headers: { Authorization: `Bearer ${token}` }}).pipe(map(
      (response) => {
        console.log(response);
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
}
