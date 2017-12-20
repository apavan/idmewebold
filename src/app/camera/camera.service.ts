import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {environment} from '../../environments/environment';

import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { IdentityData } from './identitydata';

@Injectable()
export class CameraService {

  constructor(private http: Http) { }

  uploadPhoto(body: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const identityData = new IdentityData();
    identityData.loanprofileid = localStorage.getItem('loanprofileid');
    identityData.imagedata = body;
    return this.http.post(environment.apiEndpoint + 'identity', identityData, options ).map((res: Response) => res.json());
  }

}
