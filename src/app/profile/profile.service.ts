import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { Profile } from './profile.model';



import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class ProfileService {

  constructor(private http: Http) { }

  provideBGData(profile: Profile) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    console.log(body);
    return this.http.post('http://localhost:8080/v1/bgdata', profile ).map((res: Response) => res.json());
  }

}
