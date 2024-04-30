import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './common/layout/layout.component';
import { HealthComponent } from './common/health/health.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HealthComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo-front';
}
