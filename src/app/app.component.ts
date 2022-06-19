import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidatorsService } from './custom-validators.service';
import { UsersService } from './users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  usersForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customValidators: CustomValidatorsService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.inintUsersForm();
  }

  inintUsersForm() {
    this.usersForm = this.fb.group({
      users: this.fb.array([
        this.newUser()
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
      email: ['', [Validators.required, Validators.email], [this.customValidators.hasEmail.bind(this)]],
    })
  }

  addUser() {
    this.users.push(this.newUser())
  }

  removeUser(index: number) {
    this.users.removeAt(index)
  }

  onSubmit() {
    if (this.usersForm.invalid) {
      console.log('submit')
      return
    }
   
    for (let item = 0; item < this.users.value.length; item++) {
      this.users.value[item].id = new Date().getTime();
      this.usersService.usersDto.push(this.users.value[item]);
    }
    this.usersForm.reset()
  }


}
