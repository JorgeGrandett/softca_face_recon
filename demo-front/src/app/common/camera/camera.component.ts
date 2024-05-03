import { Component } from '@angular/core';
import { CameraComponent as CameraUiComponent } from '../../ui/camera/camera.component';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [
    CameraUiComponent,
    ButtonComponent
  ],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css'
})
export class CameraComponent {

  onClickBack() {
    console.log('Back button clicked');
  }

}
