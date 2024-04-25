import { Component } from '@angular/core';
import { InputComponent } from '../../ui/input/input.component';
import { ButtonComponent } from '../../ui/button/button.component';

type userCard = {
  title: string;
  btnSave: string;
  btnCancel: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  userCardData: userCard = {
    title: 'User Card',
    btnSave: 'Save',
    btnCancel: 'Cancel'
  }
}
