import { Component, OnInit, NgZone} from '@angular/core';



import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


import { ProfileService } from './profile.service';
import {Observable} from 'rxjs/Rx';
import { UserProfile } from './profile.model';
import { UserService } from '../googlelogin/userservice';
import { AuthService } from '../googlelogin/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: number;
  editMode = false;
  profileForm: FormGroup;
  profileData: JSON;
  hashkey: string;
  verified: boolean;
  constructor(private route: ActivatedRoute, private userService: UserService,
              private auth: AuthService,
              private profileService: ProfileService,  private zone: NgZone, private router: Router) {
  }

  ngOnInit() {
    /* this.route.params
      .subscribe(
        (params: Params) => {
          this.hashkey = params['id'];
          this.initForm();
        }
      ); */
      console.log('init form is called');
      this.initForm();
  }

  onSubmit() {
       console.log('calling service in add mode');
       const profile = new UserProfile();
       profile.firstName = this.profileForm.value['firstName'];
       profile.lastName = this.profileForm.value['lastName'];
       profile.email = this.profileForm.value['email'];
       profile.econsent = this.profileForm.value['dob'];
       profile.econsent = this.profileForm.value['econsent'];


      /* this.profileService.validateProfile(profile).subscribe(
        data => {
          // refresh the list
          console.log(data);
          console.log(data['valid']);
          this.profileData = data;
          if (this.profileData['valid'] === true) {
            this.router.navigateByUrl('workflow');
            return true;
          }
        },
        error => {
          console.error('Error in verifying login!');
          return Observable.throw(error);
        }
     ); */
  }

  getLastName() {
    return localStorage.getItem('lastName');
  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {

    let lastName = localStorage.getItem('lastName');
    let phone = '';
    let email = localStorage.getItem('email');
    let firstName = localStorage.getItem('firstName');
    let dob = '';
    let streetName = '';
    let city = '';
    let state = '';

    let zip = '';

    let econsent = false;

    this.profileForm = new FormGroup({
      'lastName': new FormControl(lastName, Validators.required),
      'firstName': new FormControl(firstName, Validators.required),
      'email': new FormControl(email, Validators.required),
      'dob': new FormControl(dob, Validators.required),
      'econsent': new FormControl(econsent)

    });
  }
}
