import { Component } from '@angular/core';
import { CardFormComponent } from '../../common/card-form/card-form.component';
import { PickerComponent } from '../../ui/picker/picker.component';
import { ValidateService } from '../../services/validate/validate.service';
import { AlertComponent, AlertProps } from '../../common/alert/alert.component';
import { AlertConst } from '../../utils/alerts.const';
import { InputWhitCameraComponent } from '../../common/input-whit-camera/input-whit-camera.component';
import { CameraComponent } from '../../common/camera/camera.component';
import { UserInterface } from '../../services/users/user.service';
import { CardUserComponent } from '../../common/card-user/card-user.component';

@Component({
  selector: 'app-validate',
  standalone: true,
  imports: [
    AlertComponent,
    CardFormComponent,
    PickerComponent,
    InputWhitCameraComponent,
    CameraComponent,
    CardUserComponent
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

  userData: UserInterface | undefined = undefined

  photo: File | null = null;
  isButtonEnable: boolean = false;
  cameraMode: boolean = false;
  
  constructor(
    private validateService: ValidateService
  ) { }

  onSaveBtn() {
    if (!this.photo) return;
    this.validateService.validate({ photo: this.photo })
      .subscribe({
        next: (response: any) => {
          let userData = response.data;
          this.userData = {
            id: userData.id,
            nmid: userData.nmid,
            name: userData.name,
            createAt: userData.createdAt,
            miniature: userData.imagen
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

  validateButton() {
    this.isButtonEnable = this.photo ? true : false;
  }

  alterCamera(status: boolean) {
    this.cameraMode = status;
    this.validateButton();
  }
}
