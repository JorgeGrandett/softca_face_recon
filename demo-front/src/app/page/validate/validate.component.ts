import { Component } from '@angular/core';
import { CardFormComponent } from '../../common/card-form/card-form.component';
import { PickerComponent } from '../../ui/picker/picker.component';
import { ValidateService } from '../../services/validate/validate.service';
import { AlertComponent, AlertProps } from '../../common/alert/alert.component';
import { AlertConst } from '../../utils/alerts.const';
import { InputWhitCameraComponent } from '../../common/input-whit-camera/input-whit-camera.component';
import { CameraComponent } from '../../common/camera/camera.component';

@Component({
  selector: 'app-validate',
  standalone: true,
  imports: [
    AlertComponent,
    CardFormComponent,
    PickerComponent,
    InputWhitCameraComponent,
    CameraComponent
  ],
  templateUrl: './validate.component.html',
  styleUrl: './validate.component.css'
})
export class ValidateComponent {

  alertData: AlertProps = {
    show: false,
    type: 'error',
    message: ''
  }

  photo: File | null = null;
  isButtonEnable: boolean = false;
  cameraMode: boolean = false;
  
  constructor(
    private validateService: ValidateService
  ) { }

  onSaveBtn() {
    if (this.photo) {
      this.validateService.validate({ photo: this.photo })
        .subscribe({
          next: (response) => {
            console.log('Response:', response);
            this.alertData = {
              show: true,
              type: 'info',
              message: AlertConst.MSG_VALIDATE_USER
            }
          },
          error: (error) => {
            console.error('Error:', error);
            this.alertData = {
              show: true,
              type: 'error',
              message: AlertConst.MSG_ERR_VALIDATE_USER
            }
          }
        })
    }
  }

  validateButton() {
    this.isButtonEnable = this.photo ? true : false;
  }

  alterCamera(status: boolean) {
    this.cameraMode = status;
    this.validateButton();
  }
}
