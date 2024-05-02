import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent implements AfterViewInit {

  @ViewChild('accordionId') accordionElment!: ElementRef<HTMLDetailsElement>;
  @Input() title: string = 'Accordion Title';
  @Input() open: boolean = false;
  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngAfterViewInit(): void {
    this.toggleAccordion(this.open);
  }

  onUserAlterStatus() {
    const currentStatus: boolean = this.getStatusOfViewChild();
    this.open = !currentStatus;
    if (this.open) { this.onOpen.emit(); } else { this.onClose.emit(); }
    this.openChange.emit(currentStatus);
  } 

  getStatusOfViewChild(): boolean {
    if (this.accordionElment) 
      return this.accordionElment.nativeElement.hasAttribute('open');
    return false;
  }
  
  toggleAccordion(status: boolean) {
    if (this.accordionElment) {
      if (status) {
        this.accordionElment.nativeElement.setAttribute('open', 'true');
      } else {
        this.accordionElment.nativeElement.removeAttribute('open');
      }
    }
  }
}

export type AccordionProp = {
  title: string;
  isOpen: boolean;
}