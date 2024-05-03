import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() file: File | null = null;
  @Output() fileChange = new EventEmitter<File | null>();

  onClickBack() {
    this.file = null;
    this.fileChange.emit(this.file);
  }

  onTakePicture(file: File) {
    this.file = file;
    this.fileChange.emit(this.file);
  }
}
