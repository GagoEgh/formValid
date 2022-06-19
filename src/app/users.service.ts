import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEmailModel } from './models/userEmailModel';
import { UserModel } from './models/userModelDto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersDto:UserModel[] = [
    {
      id:1,
      firstName: 'John',
      lastName: 'Doe',
      age: 23,
      email: 'asdfa@mail.co'
    },
    {
      id:2,
      firstName: 'John',
      lastName: 'Doe',
      age: 23,
      email: 'asdfa@mail.co'
    },

  ]
  constructor(
    private http: HttpClient
  ) { }

  public getUsersEmail(): Observable<UserEmailModel[]> {
    return this.http.get<UserEmailModel[]>('https://my-json-server.typicode.com/AshotAleqs/exams/emails')
  }

  public hasUsersEmail(email: string): Observable<UserEmailModel> {
    return this.http.get<UserEmailModel>(`https://my-json-server.typicode.com/AshotAleqs/exams/emails/${email}`)
  }
}
