import { Component } from '@angular/core';
import { InputComponent } from '../../ui/input/input.component';
import { UserService } from '../../services/users/user.service';
import { CardFormComponent } from '../../common/card-form/card-form.component';
import { PickerComponent } from '../../ui/picker/picker.component';
import { AlertComponent, AlertProps } from '../../common/alert/alert.component';
import { AlertConst } from '../../utils/alerts.const';
import { AccordionComponent, AccordionProp } from '../../common/accordion/accordion.component';

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
  imports: [AlertComponent, AccordionComponent, CardFormComponent, InputComponent, PickerComponent],
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
}