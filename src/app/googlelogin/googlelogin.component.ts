import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './auth.service';
import { AppGlobals } from './app-globals';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../googlelogin/userservice';
import 'rxjs/add/operator/switchMap';
import {Observable} from 'rxjs/Rx';


@Component({

  templateUrl: './googlelogin.component.html',
  providers: [AuthService]
})
export class GoogleLoginComponent implements OnInit {
  imageURL: string;
  email: string;
  name: string;
  token: string;
  hashkey: string;
  verified: boolean;

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserService,
                        private auth: AuthService, private zone: NgZone) { }

  /**
   * Ininitalizing Google Authentication API and getting data from localstorage if logged in
   */
  ngOnInit() {
    // Set your Google Client ID here
    AppGlobals.GOOGLE_CLIENT_ID = '882689757510-afbtrk4g9akvq7nb0csn676ete277jjd.apps.googleusercontent.com';
    // '882689757510-scnhmbr6ufgqdqosiaek4fokanpficqv.apps.googleusercontent.com';
    this.getData();
    this.route.params.subscribe(
      (params: Params) => {
        this.hashkey = params['id'];
      }
    );
    // this.auth.authenticateUser({});
  }

  /**
   * Calling Google Authentication service
   */
  googleAuthenticate() {
    this.auth.authenticateUser((result) => {
      // Using Angular2 Zone dependency to manage the scope of variables
      this.zone.run(() => {
        this.getData();
        this.userService.email = this.email;
      });
      if (localStorage.getItem('token') == null) {
            return false;
        }
        this.zone.run(() => {
          this.router.navigateByUrl('profile', { queryParams: {id: this.hashkey}});
          return true;
        });


    });
  }

  /**
   * Getting data from browser's local storage
   */
  getData() {
    this.token = localStorage.getItem('token');
    this.imageURL = localStorage.getItem('image');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }
}


