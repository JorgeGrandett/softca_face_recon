import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ RouterLink, AlertComponent ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
