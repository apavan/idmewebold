import { Component, OnInit } from '@angular/core';



import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


import { ProfileService } from './profile.service';
import {Observable} from 'rxjs/Rx';
import { Profile } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: number;
  editMode = false;
  profileForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private profileService: ProfileService, private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
       console.log('calling service in add mode');
       const profile = new Profile(
       this.profileForm.value['firstName'],
       this.profileForm.value['lastName'],
       this.profileForm.value['email'],
       this.profileForm.value['phone'],
       this.profileForm.value['dob'],
       this.profileForm.value['streetName'],
       this.profileForm.value['city'],
       this.profileForm.value['state'],
       this.profileForm.value['zip']);
       this.profileService.provideBGData(profile).subscribe(
        data => {
          // refresh the list
          console.log(data);
          // this.router.navigateByUrl('profile');
          return true;
        },
        error => {
          console.error('Error in verifying login!');
          return Observable.throw(error);
        }
     );
  }


  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let lastName = '';
    let phone = '';
    let email = '';
    let firstName = '';
    let dob = '';
    let streetName = '';
    let city = '';
    let state = '';

    let zip = '';

    this.profileForm = new FormGroup({
      'lastName': new FormControl(lastName, Validators.required),
      'firstName': new FormControl(firstName, Validators.required),
      'phone': new FormControl(phone, [Validators.required,
              Validators.pattern(/^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/)]),
      'email': new FormControl(email, Validators.required),
      'dob': new FormControl(dob, Validators.required),
      'streetName': new FormControl(streetName, Validators.required),
      'city': new FormControl(city, Validators.required),
      'state': new FormControl(state, Validators.required),
      'zip': new FormControl(zip, Validators.required)
    });
  }
}
