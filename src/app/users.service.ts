import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, map, Observable } from 'rxjs';
import { UserEmailModel } from './models/userEmailModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  public getUsersEmail(): Observable<UserEmailModel[]> {
    return this.http.get<UserEmailModel[]>('https://my-json-server.typicode.com/AshotAleqs/exams/emails')
  }

  public hasUsersEmail(email: string): Observable<UserEmailModel[]>  {
    return this.http.get<UserEmailModel[]>(`https://my-json-server.typicode.com/AshotAleqs/exams/emails/${email}`)
  }
}
