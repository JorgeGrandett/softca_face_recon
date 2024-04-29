import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Urls } from '../../utils/urls.const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(
    private http: HttpClient
  ) { }

  validate(data: {
    photo: File
  }) {
    const formData = new FormData();
    formData.append('file', data.photo);
    return this.http.post(Urls.VALIDATE, formData);
  }
}
