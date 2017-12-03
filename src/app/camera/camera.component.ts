import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef , ChangeDetectionStrategy} from '@angular/core';
import { Http, Request, RequestOptions, Headers } from '@angular/http';
import { WebCamComponent } from 'ack-angular-webcam';
import { format } from 'url';
import { CameraService } from './camera.service';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import * as webcam from 'webcamjs';

@Component({
  selector: 'app-root',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})

export class CameraComponent implements OnInit {


  @ViewChild('mycamera') mycamera: ElementRef;
  @ViewChild('divForImage') results: ElementRef;
  private webcam;
  private imageData: string;


  constructor( private  http: Http, private cameraService: CameraService) { }

  ngOnInit() {
    webcam.set({
        width: 600,
        height: 700,
        image_format: 'png',
        jpeg_quality: 100
      });
      webcam.attach( this.mycamera.nativeElement);
      this.webcam = webcam;
  }

  take_snapshot() {
    // take snapshot and get image data
    this.webcam.snap( (data) => {
      this.imageData = data;
      // display results in page
    this.addImage(data);
    } );

  }
  private addImage(data: string) {

   this.results.nativeElement.innerHTML = '<h2>Here is your image:</h2>' +
    '<img src="' + data + '"/>';
  }

  submitForIdentification() {

    return this.cameraService.uploadPhoto(this.imageData.replace(/^data\:image\/\w+\;base64\,/, '')).subscribe(
        data => {
          // refresh the list
          console.log(data);
        },
        error => {
          console.error('Error in upload the photo !');
          return Observable.throw(error);
        });
  }
}
