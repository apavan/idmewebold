import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

// import { ProfileService } from './profile.service';
import { AuthService } from '../googlelogin/auth.service';
import {Http, Response, Headers, RequestOptions} from '@angular/http';

import {Observable} from 'rxjs/Rx';
@Injectable()
export class LoginRouteGuard implements CanActivate {

  verified: boolean;
  constructor(private auth: AuthService, private router: Router) {


  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> | boolean {

    const queryParams = route.queryParams;
    console.log('queryparams:' + queryParams.id);
    if ( queryParams.id) {
      localStorage.setItem('hashkey', queryParams.id);
    }
    const hashkey = queryParams.id;
    if (hashkey) {
      return this.auth.verifyLogin(hashkey).map(
          (res: Response) => {
            // refresh the list

            console.log(res);
            const resString = res.text();
            if (resString === 'Valid') {
                this.verified = true;
            }
            if (this.verified) {
              return true;
            }else {
              // this.auth.userLogout();
              this.router.navigateByUrl('invalidcustomer');
              return false;
            }
          }).catch(
            (error: any) => {
            console.error('Error in verifying login!');
            this.router.navigateByUrl('invalidcustomer');
            return Observable.of(false);
          }
      );
    }else {
      return true;
    }
  }
}
