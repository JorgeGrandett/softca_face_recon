import { Component, ElementRef, ViewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'ui-camera',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css'
})
export class CameraComponent {

  @ViewChild('camvasId') camvasElement!: ElementRef<HTMLElement>;

  onClickTakePicture() {
    
  }

}
