import { Component } from '@angular/core';
import { InputComponent } from '../../ui/input/input.component';
import { UserInterface, UserService } from '../../services/users/user.service';
import { CardFormComponent } from '../../common/card-form/card-form.component';
import { AlertComponent, AlertProps } from '../../common/alert/alert.component';
import { AlertConst } from '../../utils/alerts.const';
import { AccordionComponent, AccordionProp } from '../../common/accordion/accordion.component';
import { CardUserComponent } from '../../common/card-user/card-user.component';
import { LoadingComponent } from '../../common/loading/loading.component';
import { InputWhitCameraComponent } from '../../common/input-whit-camera/input-whit-camera.component';
import { CameraComponent } from '../../common/camera/camera.component';

type UserCardData = {
  btnSaveAllowed: boolean;
  btnCancelAllowed: boolean;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    photo: File | null;
  }
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    LoadingComponent,
    AlertComponent,
    AccordionComponent,
    CardFormComponent,
    InputComponent,
    InputWhitCameraComponent,
    CardUserComponent,
    CameraComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  accodeonData: AccordionProp[] = [
    { title: 'Create new user', isOpen: true },
    { title: 'User list', isOpen: false}
  ]

  alertData: AlertProps = {
    show: false,
    type: 'error',
    message: ''
  }

  userCardTags = {
    title: 'User Card',
    btnSave: 'Save',
    btnCancel: 'Cancel'
  }

  userCardData: UserCardData = {
    btnSaveAllowed: false,
    btnCancelAllowed: false,
    user: { id: '', firstName: '', lastName: '', photo: null }
  }

  regex = {
    id: /^\d$/,
    name: /^[a-zA-Z\s]$/
  }

  validations = {
    id: [
      { regex: /[0-9]{7,10}/, message: 'ID must be a 7-10 digit number'},
      { regex: /[1-9]\d{6,}/, message: 'ID has be a number greater than 999,999' }
    ],
    name: [
      { regex: /^[A-Za-z]+( [A-Za-z]+)?$/, message: 'Name must be in the format "First Last" or "Name"' }
    ]
  }

  usersList: UserInterface[] = []
  usersListLoading: boolean = false;

  cameraMode: boolean = false;

  constructor(
    private userService: UserService
  ) {}

  validateUserCardData() {
    this.userCardData.btnSaveAllowed =
      (this.userCardData.user.id.length > 0 && this.userCardData.user.firstName.length > 0 && this.userCardData.user.lastName.length > 0 && this.userCardData.user.photo !== null);
    this.userCardData.btnCancelAllowed =
      (this.userCardData.user.id.length > 0 || this.userCardData.user.firstName.length > 0 || this.userCardData.user.lastName.length > 0 || this.userCardData.user.photo !== null);
  }

  clearUserCardData() {
    this.userCardData.user = {
      id: '',
      firstName: '',
      lastName: '',
      photo: null
    }
    this.validateUserCardData();
  }

  saveUserCardData() {
    this.userService.createUser({
      nmid: this.userCardData.user.id,
      name: this.userCardData.user.firstName + ' ' + this.userCardData.user.lastName,
      file: this.userCardData.user.photo!
    }).subscribe({
      next: (response) => {
        console.log('User created:', response);
        this.alertData = {
          show: true,
          type: 'info',
          message: AlertConst.MSG_CREATE_USER
        }
        this.clearUserCardData();
      },
      error: (error) => {
        console.error('Failed to create user:', error);
        this.alertData = {
          show: true,
          type: 'error',
          message: AlertConst.MSG_ERR_CREATE_USER
        }
      }
    })
  }

  onCloseCreateUser() {
    this.cameraMode = false;
    this.clearUserCardData();
  }

  deployUsers() {
    this.usersListLoading = true;
    this.accodeonData[0].isOpen = false;
    this.userService.getUsers().subscribe({
      next: (response) => {
        const listOfResponse = response.data;
        this.usersList = listOfResponse.map((item: any): UserInterface => {
          //console.log('User:', item);
          return {
            id: item.id,
            nmid: item.nmid,
            name: item.name,
            createAt: item.createdAt,
            miniature: item.imagen
          }
        })
      },
      error: (error) => {
        console.error('Failed to get users:', error);
        this.alertData = {
          show: true,
          type: 'error',
          message: AlertConst.MSG_ERR_GET_USERS
        }
      },
      complete: () => {
        this.usersListLoading = false;
      }
    })
  }

  openCamera() {
    this.cameraMode = true;
  }
}