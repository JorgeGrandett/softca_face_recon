import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'ui-picker',
  standalone: true,
  imports: [],
  templateUrl: './picker.component.html',
  styleUrl: './picker.component.css'
})
export class PickerComponent implements OnChanges, AfterViewInit {

  @ViewChild('inputId') inputElement!: ElementRef<HTMLElement>;
  @Input() label: string = 'Image Picker';
  @Input() file: File | null = null;
  @Output() fileChange: EventEmitter<File | null> = new EventEmitter<File | null>();
  fileName: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    //console.log('PickerComponent: ngOnChanges', changes);
    if (changes['file'] && !changes['file'].firstChange) {
      if (changes['file'].currentValue) {
        this.fileName = changes['file'].currentValue.name;
        this.inputElement.nativeElement.classList.add('is-active');
      } else {
        this.fileName = '';
        this.inputElement.nativeElement.classList.remove('is-active');
      }
    }
  }

  ngAfterViewInit(): void {
    //console.log('PickerComponent: ngAfterViewInit');
    if (this.file) {
      this.fileName = this.file.name;
      this.inputElement.nativeElement.classList.add('is-active');
    } else {
      this.fileName = '';
      this.inputElement.nativeElement.classList.remove('is-active');
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
      this.fileChange.emit(null);
    }
  }
}
