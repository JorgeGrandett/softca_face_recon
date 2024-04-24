import { Component } from '@angular/core';
import { InputComponent } from '../../ui/input/input.component';

type userCard = {
  title: string;
  btnSave: string;
  btnCancel: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [InputComponent],
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
