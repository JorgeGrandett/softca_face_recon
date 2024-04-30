import { Component, OnInit } from '@angular/core';
import { HealthService } from '../../services/health/health.service';

@Component({
  selector: 'app-health',
  standalone: true,
  imports: [],
  templateUrl: './health.component.html',
  styleUrl: './health.component.css'
})
export class HealthComponent implements OnInit {

  isError: boolean = false;
  show: boolean = true;

  constructor(
    private healthService: HealthService,
  ) { }

  ngOnInit() {
    this.checkPeriodically()
  }

  saveOnLocalStorage() {
    
  }

  checkPeriodically(): NodeJS.Timeout {
    return setInterval(() => {
      console.log('Checking health...');
    }, 5000);
  }

  reload() {
    window.location.reload();
  }
}
