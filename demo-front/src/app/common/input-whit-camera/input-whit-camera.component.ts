import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PickerComponent } from '../../ui/picker/picker.component';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-input-whit-camera',
  standalone: true,
  imports: [
    PickerComponent,
    ButtonComponent
  ],
  templateUrl: './input-whit-camera.component.html',
  styleUrl: './input-whit-camera.component.css'
})
export class InputWhitCameraComponent {

  @Input() file: File | null = null;
  @Output() fileChange = new EventEmitter<File | null>();
  @Output() onCamara = new EventEmitter<void>();

  onFileChange($event: File | null) {
    this.fileChange.emit($event);
  }

  onClickCamara() {
    this.onCamara.emit();
  }
}
