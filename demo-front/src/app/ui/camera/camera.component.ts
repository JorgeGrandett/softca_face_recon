import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { LoadingComponent } from '../../common/loading/loading.component';

@Component({
  selector: 'ui-camera',
  standalone: true,
  imports: [
    ButtonComponent,
    LoadingComponent
  ],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css'
})
export class CameraComponent implements AfterViewInit {

  @ViewChild('canvasId') canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('videoId') videoElement!: ElementRef<HTMLVideoElement>;
  @Output() onTakePicture = new EventEmitter<File>();

  isLoading: boolean = true;
  isBtnConfirmEnabled: boolean = false;
  file: File | null = null;

  constructor() { }

  ngAfterViewInit() {
    this.startCamera();
  }

  onClickTakePicture(): void {
    if (this.isLoading) return;

    const videoElement = this.videoElement.nativeElement;
    const canvasElement = this.canvasElement.nativeElement;
  
    videoElement.classList.add('miniature');

    const context = canvasElement.getContext('2d');

    if (context) {
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
      context?.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      this.file = this.getImage();

      this.isBtnConfirmEnabled = this.file !== null;
    }
  }

  startCamera(): void {
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then((stream) => {
      const videoElement = this.videoElement.nativeElement;
      const aspectRatio = stream.getVideoTracks()[0].getSettings().aspectRatio;
      const parentElement = videoElement.parentElement;
      
      if (parentElement) parentElement.style.aspectRatio = (aspectRatio ? aspectRatio : (19/9)).toString();

      videoElement.srcObject = stream;
      videoElement.play();
      this.isLoading = false;
    }).catch((error) => {
      console.error('Error accessing the camera', error);
    });
  }

  getImage(): File | null {
    const canvasElement = this.canvasElement.nativeElement;
    const dataUrl = canvasElement.toDataURL('image/jpeg');
    const blob = this.dataURLtoBlob(dataUrl);
    return new File([blob], 'camera.jpg');
  }

  dataURLtoBlob(dataUrl: string): Blob {
    const parts = dataUrl.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const byteCharacters = atob(parts[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  onConfirm() {
    if (this.file) {
      this.onTakePicture.emit(this.file);
    }
  }
}
