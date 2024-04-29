import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.css'
})
export class CardFormComponent {

  @Input() title: string = 'Cart Title';
  @Input() btnSave: { label: string, allowed: boolean } = {
    label: 'Save',
    allowed: false
  };
  @Input() btnCancel: { label: string, allowed: boolean, hidden?: boolean } = {
    label: 'Cancel',
    allowed: false,
    hidden: false
  };
  @Output() onSave: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  save() {
    this.onSave.emit();
  }

  cancel() {
    this.onCancel.emit();
  }
}
