import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'ui-picker',
  standalone: true,
  imports: [],
  templateUrl: './picker.component.html',
  styleUrl: './picker.component.css'
})
export class PickerComponent implements OnChanges {

  @ViewChild('inputId') inputElement!: ElementRef<HTMLElement>;
  @Input() label: string = 'Image Picker';
  @Input() file: File | null = null;
  @Output() fileChange: EventEmitter<File | null> = new EventEmitter<File | null>();
  fileName: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    //console.log('PickerComponent: onChanges');
    const { file } = changes;
    if (!file.currentValue && this.inputElement) {
      this.onClearFile();
    }
  }

  onFileChange(event: any) {
    //console.log('PickerComponent: onFileChange', event);
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.inputElement.nativeElement.classList.add('is-active');
      this.fileChange.emit(this.file);
    } else {
      this.fileName = '';
      this.inputElement.nativeElement.classList.remove('is-active');
    }
  }

  onClearFile() {
    //console.log('PickerComponent: onClearFile');
    if (!this.file) {
      this.file = null;
      this.fileName = '';
      this.inputElement.nativeElement.classList.remove('is-active');
      const inputsOnElement = this.inputElement.nativeElement.getElementsByTagName('input');
      if (inputsOnElement.length > 0) inputsOnElement[0].value = '';
      this.fileChange.emit(this.file);
    }
  }
}
