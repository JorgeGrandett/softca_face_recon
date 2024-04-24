import { Component } from '@angular/core';
import { InputComponent } from '../../ui/input/input.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
