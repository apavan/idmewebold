import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { Injectable } from '@angular/core';

import { ProfileService } from './profile.service';
import { AuthService } from '../googlelogin/auth.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';
@Injectable()
export class ProfileRouteGuard implements CanActivate {

  verified: boolean;
  constructor(private auth: AuthService, private profileService: ProfileService) {


  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> {
    const queryParams = route.queryParams;
    console.log('queryparams:' + queryParams.id);
    const hashkey = queryParams.id;
    return this.auth.verifyProfile(hashkey, localStorage.getItem('email')).map(
        (res: Response) => {
          // refresh the list

         
          console.log(res);
          if (res.json()) {
            this.verified = res.json()['response'] === 'Valid';
          }
          console.log(this.verified);
          // this.verified = true;
          if (this.verified) {
            return true;
          }else {
            this.auth.userLogout();
            return false;
          }
        },
        error => {
          console.error('Error in verifying login!');
          return false;
        }
    );
  }
}
