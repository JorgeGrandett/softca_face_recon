import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {

  @ViewChild('inputId') inputElement!: ElementRef<HTMLElement>;
  @Input() label: string = 'Title';
  @Input() value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  onValueChange() {
    this.valueChange.emit(this.value);
  }

  onInputFocus() {
    this.inputElement.nativeElement.classList.add('is-active');
  }

  onInputBlur() {
    if (this.value.length == 0) this.inputElement.nativeElement.classList.remove('is-active');
  }

  
}
