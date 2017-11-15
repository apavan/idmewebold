import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { Login } from './login.model';

import {Observable} from 'rxjs/Rx';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  id: number;
  editMode = false;
  loginForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private loginService: LoginService, private router: Router) {
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
       const newLogin = new Login(this.loginForm.value['lastName'],
       this.loginForm.value['email'],
       this.loginForm.value['phone']);
       this.loginService.verifyLogin(newLogin).subscribe(
        data => {
          // refresh the list
          console.log(data);
          if ( data['verified'] === 'true') {
           this.router.navigateByUrl('profile');
           return true;
          }
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
    this.loginForm = new FormGroup({
      'lastName': new FormControl(lastName, Validators.required),
      'phone': new FormControl(phone, [Validators.required,
        Validators.pattern(/^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/)]),
      'email': new FormControl(email, Validators.required)

    });
  }
}
