import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() label?: string = '';
  @Input() icon?: string = '';
  @Input() isActive?: boolean = true;
  @Output() onClick: EventEmitter<undefined> = new EventEmitter();

  onClickHandler() {
    this.onClick.emit();
  }

}
