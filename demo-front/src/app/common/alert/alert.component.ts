import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alet',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() show: boolean = false;
  @Input() title: string = 'Alert';
  @Input() message: string = 'This is an alert message';

  onClose() {
    this.show = false;
  }
}
