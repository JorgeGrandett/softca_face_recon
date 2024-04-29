import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Urls } from '../../utils/urls.const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  createUser(userData: {
    nmid: string,
    name: string,
    file: File
  }): Observable<any> {
    const formData = new FormData();
    formData.append('nmid', userData.nmid);
    formData.append('name', userData.name);
    formData.append('file', userData.file);
    return this.http.post(Urls.USER, formData);
  }
}
