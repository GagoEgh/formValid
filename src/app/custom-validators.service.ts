import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { map, Observable,debounceTime } from 'rxjs';
import { UserEmailModel } from './models/userEmailModel';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService {

  userEmail!: UserEmailModel[];
  constructor(private usersService: UsersService) {}
  hasEmail(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.usersService.hasUsersEmail(control.value)
      .pipe(debounceTime(300),
        map((res) => {
          if (!res) {
            return null
          }
          return {
            hasEmail: true
          }
        }))
  }
}
