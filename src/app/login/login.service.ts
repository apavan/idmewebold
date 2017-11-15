import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { Login } from './login.model';

import {Http, Response, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  verifyLogin(login: Login) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(login);
    return this.http.post('http://localhost:8080/v1/login/', body, options ).map((res: Response) => res.json());
  }

}
