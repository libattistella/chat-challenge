import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public serializeObj(obj) {
    const result = [];
    for (const property in obj) {
      if (property) {
        result.push(encodeURIComponent(property) + '=' + encodeURIComponent(obj[property]));
      }
    }
    return result.join('&');
  }

  public getHeadersForm() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return headers;
  }

  public getHeadersJSON() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
