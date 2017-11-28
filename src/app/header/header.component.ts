import { Component, OnInit, NgZone  } from '@angular/core';
import { Response } from '@angular/http';
import { AuthService } from '../googlelogin/auth.service';
import { AppGlobals } from '../googlelogin/app-globals';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {

  token: string;
  constructor(private route: ActivatedRoute, private router: Router,
    private auth: AuthService, private zone: NgZone) { }

  /**
   * Ininitalizing Google Authentication API and getting data from localstorage if logged in
   */
  ngOnInit() {
    // Set your Google Client ID here
    AppGlobals.GOOGLE_CLIENT_ID = '882689757510-scnhmbr6ufgqdqosiaek4fokanpficqv.apps.googleusercontent.com';
    this.token = localStorage.getItem('token');
  }
  isUserLoggedin() {
    if ( localStorage.getItem('token') != null) {
        return true;
    }
    return false;
  }

  /**
   * Logout user and calls function to clear the localstorage
   */
  logout() {
    this.auth.userLogout();
  }

}
