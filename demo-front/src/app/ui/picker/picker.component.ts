import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'ui-picker',
  standalone: true,
  imports: [],
  templateUrl: './picker.component.html',
  styleUrl: './picker.component.css'
})
export class PickerComponent {

  @ViewChild('inputId') inputId!: ElementRef<HTMLElement>;
  @Input() label: string = 'Image Picker';
  @Output() fileChange: EventEmitter<File> = new EventEmitter<File>();
  file: File | null = null;
  fileName: string = '';

  onFileChange(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.inputId.nativeElement.classList.add('is-active');
      this.fileChange.emit(this.file);
    } else {
      this.fileName = '';
      this.inputId.nativeElement.classList.remove('is-active');
    }
  }
}
