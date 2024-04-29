import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnChanges {

  @ViewChild('inputId') inputElement!: ElementRef<HTMLElement>;
  @Input() label: string = 'Title';
  @Input() value: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  hasFocus: boolean = false;
  @Input() regex: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    const { value } = changes;
    if (value && value.currentValue.length == 0 && this.inputElement && !this.hasFocus)
        this.inputElement.nativeElement.classList.remove('is-active');
  }

  onValueChange() {
    this.valueChange.emit(this.value);
  }

  onInputFocus() {
    this.hasFocus = true;
    this.inputElement.nativeElement.classList.add('is-active');
  }

  onInputBlur() {
    this.hasFocus = false;
    if (this.value.length == 0) this.inputElement.nativeElement.classList.remove('is-active');
  }
}
