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
  @Input() isOpen: boolean = false;
  @Output() isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  ngAfterViewInit(): void {
    this.toggleAccordion(this.isOpen);
  }

  onUserAlterStatus() {
    const currentStatus: boolean = this.getStatusOfViewChild();
    this.isOpen = currentStatus;
    this.isOpenChange.emit(currentStatus);
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
