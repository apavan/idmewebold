import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { GoogleLoginComponent } from './googlelogin/googlelogin.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkflowComponent } from './workflow/workflow.component';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { CameraComponent } from './camera/camera.component';
import { ProfileRouteGuard } from './profile/profile-route-guard';
import { LoginRouteGuard } from './googlelogin/login-route-guard';
import { InvalidcustomerComponent } from './invalidcustomer/invalidcustomer.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: GoogleLoginComponent, canActivate: [LoginRouteGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileRouteGuard], },
  { path: 'invalidcustomer', component: InvalidcustomerComponent },
  { path: 'workflow', component: WorkflowComponent },
  { path: 'camera', component: CameraComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
