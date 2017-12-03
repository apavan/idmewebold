import { Injectable } from '@angular/core';
import { AppGlobals } from './app-globals';
import { UserService } from '../googlelogin/userservice';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {environment} from '../../environments/environment';
import { UserProfile } from '../profile/profile.model';


declare const gapi: any;
const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

@Injectable()
export class AuthService {
  constructor(private http: Http, private userService: UserService) { }

  /**
   * Calling Google login API and fetching account details.
   * @param callback Callback to function
   */
  public authenticateUser(callback) {
    let auth2: any;
    let result: any;
    let error: any;
    gapi.load('auth2', function () {
      auth2 = gapi.auth2.init({
        client_id: AppGlobals.GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      // Login button reference
      let loginButton: any = document.getElementById('google-login-button');
      auth2.attachClickHandler(loginButton, {},
        function (userDetails) {
          // Getting profile object
          let profile = userDetails.getBasicProfile();

          // Setting data to localstorage.
          localStorage.setItem('token', userDetails.getAuthResponse().id_token);
          localStorage.setItem('image', profile.getImageUrl());
          localStorage.setItem('name', profile.getName());
          localStorage.setItem('lastName', profile.getFamilyName());
          localStorage.setItem('firstName', profile.getGivenName());
          localStorage.setItem('email', profile.getEmail());
          callback();
        },
        function (error) {
          console.log(error);
          // this.error = (JSON.stringify(error, undefined, 2));
        });
    });
  }
  /**
   * Logout user and calls function to clear the localstorage
   */
  logout() {
    this.clearLocalStorage();
  }

  /**
   * Clearing Localstorage of browser
   */
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('image');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    if (localStorage.getItem('hashkey')) {
      localStorage.removeItem('hashkey');
    }
  }

  /**
   * Logout user from Google
   * @param callback Callback to function
   */
  userLogout() {
    // you will be redirected to this URL after logging out from Google.
    let homeUrl = 'https://d2mn4lk3n6z48v.cloudfront.net/index.html'; // "http://localhost:4200";
    let logoutUrl = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=" + homeUrl;
    document.location.href = logoutUrl;
    this.logout();
  }
  verifyLogin(hashkey: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(hashkey);
    return this.http.get(environment.apiEndpoint + 'validateHashKey/' + hashkey, options );
  }
  verifyProfile(hashkey: string, profileId: string) {


    const headers = new Headers({ 'Content-Type': 'application/json' });
    const token = localStorage.getItem('token');
    if (token) {
     headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${token}`);
    }
    const options = new RequestOptions({ headers: headers });
    const profile = new UserProfile();
    profile.loginprofileid = profileId;
   if (localStorage.getItem('hashkey')) {
      profile.hashkey = localStorage.getItem('hashkey');
    }
    const body = JSON.stringify(profile);
    console.log(body);
    console.log(options.headers);
   // , this.authRequestOptions
    return this.http.post(environment.apiEndpoint + 'validateLoginProfileId', profile, options);
  }

}
