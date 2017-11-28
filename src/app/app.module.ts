import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


import { AppRoutingModule } from './app-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile/profile.service';
import { GoogleLoginComponent } from './googlelogin/googlelogin.component';
import { UserService } from './googlelogin/userservice';
import { AuthService } from './googlelogin/auth.service';

import { AuthRequestOptions } from './googlelogin/authrequestoptions';

import { requestOptionsProvider } from './googlelogin/authrequestoptions';
import { RequestOptions} from '@angular/http';
import { WorkflowComponent } from './workflow/workflow.component';

import { CameraComponent } from './camera/camera.component';
import { CameraService } from './camera/camera.service';
import { WebCamModule } from 'ack-angular-webcam';
import { ProfileRouteGuard } from './profile/profile-route-guard';
import { LoginRouteGuard } from './googlelogin/login-route-guard';

import { InvalidcustomerComponent } from './invalidcustomer/invalidcustomer.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    GoogleLoginComponent,
    WorkflowComponent, CameraComponent, InvalidcustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
   WebCamModule
  ],
  providers: [AuthService, ProfileService, UserService, CameraService, requestOptionsProvider, ProfileRouteGuard, LoginRouteGuard,
    {provide: 'Window', useValue: window},
    {provide: 'Navigator', useValue: navigator}],
  bootstrap: [AppComponent]
})
export class AppModule { }
