import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AlertConst } from '../../utils/alerts.const';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnChanges {
  @Input() alertProps: AlertProps = {
    show: false,
    type: 'error',
    message: ''
  }
  alertTitle: string = '';
  alertTitleClass: string = '';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.reloadTitle();
  }

  reloadTitle(): void {
    if (this.alertProps.type && this.alertProps.type === 'info') {
      this.alertTitle = AlertConst.ALERT_TITLE;
      this.alertTitleClass = '';
      return;
    }
    this.alertTitle = AlertConst.ALERT_ERR_TITLE;
    this.alertTitleClass = 'alert-error';
  }

  onClose() {
    this.alertProps.show = false;
    this.alertProps.message = '';
    this.alertProps.type = 'error';
  }
}

export type AlertProps = {
  show: boolean;
  type?: 'error' | 'info';
  message: string;
}