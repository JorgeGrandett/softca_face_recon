import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

type ValidationProps = {
  regex: RegExp;
  message: string;
}

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

  @Input() regex?: RegExp;
  @Input() maxLength: number = 50;
  @Input() minLength: number = 0;

  @Input() validations: ValidationProps[] = [];
  valid: boolean = false;
  errMessage: string = '';
  @Output() validChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    const { value } = changes;
    if (value && value.currentValue.length == 0 && this.inputElement && !this.hasFocus)
      this.inputElement.nativeElement.classList.remove('is-active');
  }

  onValueChange() {
    this.valueChange.emit(this.value);
    this.validate()
  }

  onInputFocus() {
    this.hasFocus = true;
    this.inputElement.nativeElement.classList.add('is-active');
  }

  onInputBlur() {
    this.hasFocus = false;
    if (this.value.length == 0) this.inputElement.nativeElement.classList.remove('is-active');
  }

  onKeyPress($event: KeyboardEvent) {
    if (this.regex && !this.regex.test($event.key)) $event.preventDefault();
  }

  validRegex(omit: boolean, regex: RegExp): boolean {
    if (omit) return true;
    return regex.test(this.value);
  }

  validate() {
    if (this.validations.length > 0) {
      this.valid = this.validations.every(({ regex, message }) => {
        if (!this.validRegex(this.value.length == 0, regex)) {
          this.errMessage = message;
          return false;
        }
        return true;
      });
    } else {
      this.valid = true;
    }

    if (this.valid) {
      this.inputElement.nativeElement.classList.remove('has-error');
    } else {
      this.inputElement.nativeElement.classList.add('has-error');
    }
    
    this.validChange.emit(this.valid);
  }
}