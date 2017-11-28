import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { UserProfile } from './profile.model';



import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {AuthRequestOptions} from '../googlelogin/authrequestoptions';
import {environment} from '../../environments/environment';


const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

@Injectable()
export class ProfileService {

  constructor(private http: Http) { }

  provideBGData(profile: UserProfile) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token');
    if (token) {
     headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);
    }
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(profile);
    console.log(body);
    console.log(options.headers);
   // , this.authRequestOptions
    return this.http.post(environment.apiEndpoint + '/bgdata', profile, options).map((res: Response) => res.json());
  }


}
