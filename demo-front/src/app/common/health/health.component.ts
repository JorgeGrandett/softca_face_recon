import { AfterViewInit, Component } from '@angular/core';
import { HealthService } from '../../services/health/health.service';
import { After } from 'node:v8';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [],
  templateUrl: './health.component.html',
  styleUrl: './health.component.css'
})
export class HealthComponent implements AfterViewInit {

  isError: boolean = false;
  show: boolean = true;

  constructor(
    private healthService: HealthService,
  ) { }

  ngAfterViewInit(): void {
    this.checkPeriodically()
  }

  saveOnLocalStorage() {
    
  }

  checkPeriodically(): void {
    console.log('test')
  }

  reload() {
    window.location.reload();
  }
}
