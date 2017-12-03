import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as webcam from 'webcamjs';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent implements OnInit {

  @ViewChild('mycamera') mycamera: ElementRef;
  @ViewChild('divForImage') results: ElementRef;
  private webcam;
  private imageData: string;
  constructor() { }

  ngOnInit() {
  webcam.set({
			width: 320,
			height: 240,
			image_format: 'jpeg',
			jpeg_quality: 90
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


}
