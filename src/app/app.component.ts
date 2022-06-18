import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { debounceTime, map, Observable, of } from 'rxjs';
import { CustomValidatorsService } from './custom-validators.service';
import { UserEmailModel } from './models/userEmailModel';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  usersForm!: FormGroup;
  userEmail!: UserEmailModel[];
  isOk = false;
  constructor(
    private fb: FormBuilder,
    private customValidators:CustomValidatorsService 
  ) { }

  ngOnInit(): void {
    this.inintUsersForm();
    setTimeout(() => {
      console.log(this.usersForm.get('users'))
    }, 400)
  }

  inintUsersForm() {
    this.usersForm = this.fb.group({
      users: this.fb.array([
        this.fb.group({
          firstName: ['', [Validators.required, Validators.minLength(3)]],
          lastName: ['', [Validators.required, Validators.minLength(3)]],
          age: ['', [Validators.required, Validators.min(6)]],
          email: ['', [Validators.required, Validators.email], [this.customValidators.hasEmail.bind(this.customValidators)]],
        })
      ]),
    });
  }

  get users() {
    return this.usersForm.get('users') as FormArray
  }

  newUser() {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(6)]],
      email: ['', [Validators.required, Validators.email], [this.customValidators.hasEmail.bind(this.customValidators)]],
    })
  }

  addUser() {
    this.users.push(this.newUser())
  }

  removeUser(index: number) {
    if (index === 0) {
      return
    }
    this.users.removeAt(index)
  }
  
  onSubmit() {

    if (this.usersForm.invalid) {
      return
    }
    this.isOk = true
  }

}
