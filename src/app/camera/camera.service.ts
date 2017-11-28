import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {environment} from '../../environments/environment';

import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class CameraService {

  constructor(private http: Http) { }

  uploadPhoto(body: any) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(environment.apiEndpoint + 'identity', body, null ).map((res: Response) => res.json());
  }

}
