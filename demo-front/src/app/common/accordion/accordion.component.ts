import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent implements AfterViewInit, OnChanges {

  @ViewChild('accordionId') accordionElment!: ElementRef<HTMLDetailsElement>;
  @Input() title: string = 'Accordion Title';
  @Input() open: boolean = false;
  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngAfterViewInit(): void {
    this.setAccordionStatus(this.open);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && !changes['open'].firstChange) {
      this.setAccordionStatus(this.open);
    }
  }

  clickEvent($event: any) {
    $event.preventDefault();
    this.setAccordionStatus(!this.open);
  }
  
  setAccordionStatus(status: boolean) {
    this.open = status;
    if (this.accordionElment) {
      if (status) {
        this.accordionElment.nativeElement.setAttribute('open', 'true');
        this.onOpen.emit();
      } else {
        this.accordionElment.nativeElement.removeAttribute('open');
        this.onClose.emit();
      }
    }
    this.openChange.emit(status);
  }
}

export type AccordionProp = {
  title: string;
  isOpen: boolean;
}