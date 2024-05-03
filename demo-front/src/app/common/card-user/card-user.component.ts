import { Component, Input } from '@angular/core';
import { UserInterface } from '../../services/users/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-user.component.html',
  styleUrl: './card-user.component.css'
})
export class CardUserComponent {

  @Input() userItem: UserInterface = { id: '', nmid: '', name: '', createAt: '', miniature: '' };

}
