import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'ui-picker',
  standalone: true,
  imports: [],
  templateUrl: './picker.component.html',
  styleUrl: './picker.component.css'
})
export class PickerComponent implements OnChanges, AfterViewInit {

  @ViewChild('inputId') inputElement?: ElementRef<HTMLElement>;
  @Input() label: string = 'Image Picker';
  @Input() file: File | null = null;
  @Output() fileChange: EventEmitter<File | null> = new EventEmitter<File | null>();
  fileName?: string;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    if (this.file) {
      this.fileName = this.file.name;
      this.inputElement!.nativeElement.classList.add('is-active');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cd.detectChanges();
    const { file } = changes;
    if (file && file.currentValue) {
      this.fileName = file.currentValue.name;
      this.inputElement!.nativeElement.classList.add('is-active');
    } else {
      this.fileName = '';
      this.inputElement!.nativeElement.classList.remove('is-active');
    }
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.fileName = this.file.name;
      this.inputElement!.nativeElement.classList.add('is-active');
      this.fileChange.emit(this.file);
    } else {
      this.fileName = '';
      this.inputElement!.nativeElement.classList.remove('is-active');
      this.fileChange.emit(null);
    }
  }
}
