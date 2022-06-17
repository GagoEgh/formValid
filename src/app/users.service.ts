import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEmailModel } from './models/userEmailModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  public getUsersEmail():Observable<UserEmailModel[]> {
    return this.http.get<UserEmailModel[]>('https://my-json-server.typicode.com/AshotAleqs/exams/emails')
  }
}
