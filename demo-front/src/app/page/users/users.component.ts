import { Component } from '@angular/core';
import { InputComponent } from '../../ui/input/input.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { PickerComponent } from '../../ui/picker/picker.component';
import { UserService } from '../../services/users/user.service';

type UserCardData = {
  btnSaveAllowed: boolean;
  btnCancelAllowed: boolean;
  user: {
    id: string;
    name: string;
    photo: File | null;
  }
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [InputComponent, ButtonComponent, PickerComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  userCardTags = {
    title: 'User Card',
    btnSave: 'Save',
    btnCancel: 'Cancel'
  }

  userCardData: UserCardData = {
    btnSaveAllowed: false,
    btnCancelAllowed: false,
    user: {
      id: '',
      name: '',
      photo: null
    }
  }

  constructor(
    private userService: UserService
  ) {}

  validateUserCardData() {
    this.userCardData.btnSaveAllowed =
      (this.userCardData.user.id.length > 0 && this.userCardData.user.name.length > 0 && this.userCardData.user.photo !== null);
    this.userCardData.btnCancelAllowed =
      (this.userCardData.user.id.length > 0 || this.userCardData.user.name.length > 0 || this.userCardData.user.photo !== null);
  }

  clearUserCardData() {
    //console.log('Clearing user card data');
    this.userCardData.user = {
      id: '',
      name: '',
      photo: null
    }
    this.validateUserCardData();
  }

  saveUserCardData() {
    //console.log('Saving user card data:', this.userCardData.user);
    this.userService.createUser({
      nmid: this.userCardData.user.id,
      name: this.userCardData.user.name,
      file: this.userCardData.user.photo!
    }).subscribe({
      next: (response) => {
        console.log('User created:', response);
        this.clearUserCardData();
      },
      error: (error) => {
        console.error('Failed to create user:', error);
      }
    })
  }
}
