import { Component } from '@angular/core';
import { Http, Request, RequestOptions, Headers } from '@angular/http';
import { WebCamComponent } from 'ack-angular-webcam';
import { format } from 'url';
import { CameraService } from './camera.service';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})

export class CameraComponent {
  webcam: WebCamComponent;
  imageData: any;
  options = {
    audio: false,
    video: false,
    width: 600,
    height: 840,
    fallbackMode: 'callback',
    fallbackSrc: 'jscam_canvas_only.swf',
    fallbackQuality: 85,
    cameraType: 'front' || 'back'
  }

  constructor(private  http: Http, private cameraService: CameraService) { }

  genPostData() {
    this.webcam.captureAsFormData({ fileName: 'file.jpg' })
      .then(formData => {
        // this.postFormData(formData);
        console.log('camera called');
        this.imageData = this.webcam.getBase64();
        this.postFormData(formData);

      })
      .catch(e => {
        console.error(e);
      });
  }

  postFormData(formData) {
    const config = {
      method: 'post',
      url: environment.apiEndpoint + 'uploadfile',

      body: formData.get('file')
    };

    const request = new Request(config);
    const formDat = new FormData();
    const headers = new Headers({ 'Content-Type': 'multipart/form-data' });
   const options = new RequestOptions({ headers: headers });

    console.log(options.headers);
   // ,
    formDat.append('file', formData.get('file'));
    const body = JSON.stringify(formDat.get('file'));
    console.log(formDat);

    return this.cameraService.uploadPhoto(formDat.get('file')).subscribe(
        data => {
          // refresh the list
          console.log(data);
        },
        error => {
          console.error('Error in upload the photo !');
          return Observable.throw(error);
        });
  }

  onCamError(err) { }

  onCamSuccess() { }
}
