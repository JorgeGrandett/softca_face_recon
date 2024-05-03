import { Component, Input } from '@angular/core';
import { UserInterface } from '../../services/users/user.service';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {

  @Input() userItem: UserInterface = { id: '', nmid: '', name: '', createAt: '', miniature: '' };

}
