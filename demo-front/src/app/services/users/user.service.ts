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

  createUser(UserData: {
    nmid: string,
    name: string,
    file: File
  }): Observable<any> {
    return this.http.post(Urls.USER, UserData);
  }
}
