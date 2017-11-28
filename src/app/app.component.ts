import { Component } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = '';
  hashkey = '';
  constructor(private route: ActivatedRoute,
     private router: Router) {
}
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
