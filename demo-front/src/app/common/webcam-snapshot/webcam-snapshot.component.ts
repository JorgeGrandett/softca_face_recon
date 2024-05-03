import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-webcam-snapshot',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './webcam-snapshot.component.html',
  styleUrl: './webcam-snapshot.component.css'
})
export class WebcamSnapshotComponent implements AfterViewInit {

  WIDTH = 640;
  HEIGHT = 480;

  @ViewChild("video")
  public video!: ElementRef;

  @ViewChild("canvas")
  public canvas!: ElementRef;

  pictureCapture: string = "";
  error: any;
  isCaptured: boolean = false;

  async ngAfterViewInit(): Promise<void> {
    await this.setupDevices();
  }

  async setupDevices() {
    if(navigator.mediaDevices) {

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true
        });
        if(stream) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
          this.error = null;
        }
        else {
          this.error = "No se encontro la camara";
        }
      }catch(e) {
        this.error = e;
      }
    }
  }

  capture() {
    this.drawImageToCanvas(this.video.nativeElement);
    this.pictureCapture = this.canvas.nativeElement.toDataURL("image/png");
    this.isCaptured = true;
  }

  removeCurrent () {
    this.isCaptured = false;
  }

  setPhoto() {
    this.isCaptured = true;
    var image = new Image();
    image.src = this.pictureCapture;
    this.drawImageToCanvas(image);
  }

  drawImageToCanvas(image: any) {
    this.canvas.nativeElement.getContext("2d").drawImage(image, 0, 0, this.WIDTH, this.HEIGHT);
  }
}
