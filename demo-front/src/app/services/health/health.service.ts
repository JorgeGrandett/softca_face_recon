import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Urls } from '../../utils/urls.const'

@Injectable({
  providedIn: 'root'
})
export class HealthService {

  constructor(
    private http: HttpClient
  ) { }

  checkHealth(): Observable<any> {
    return this.http.get(Urls.HEALTH);
  }
}
