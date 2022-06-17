import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
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
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
     this.getUserEmial();
    this.inintUsersForm();
  }

  getUserEmial() {
    this.usersService.getUsersEmail()
      .subscribe({
        next: (res: UserEmailModel[]) => {
          this.userEmail = res;
        }
      })
  }
  inintUsersForm() {
    this.usersForm = this.fb.group({
      users: this.fb.array([
        this.fb.group({
          firstName: ['', [Validators.required, Validators.minLength(3)]],
          lastName: ['', [Validators.required, Validators.minLength(3)]],
          age: ['', [Validators.required, Validators.min(6)]],
          email: ['',[Validators.required,Validators.email]],
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
      email: ['', [Validators.required,Validators.email]],
    })
  }

  addUser() {
    this.users.push(this.newUser())
  }

  removeUser(index: number) {
    this.users.removeAt(index)
  }

  onSubmit() {

    if(this.usersForm.invalid){
      return
    }
    this.isOk = true
  }

}


function hasEmail(arg:any) {
  return (control: AbstractControl): Observable<ValidationErrors | null> =>{
    console.log(control.value);
    console.log(arg)
    // const injector = Injector.create([
    //   {
    //     provide: UsersService,
    //     useClass: UsersService

    //   }
    // ])
    // const service = injector.get(UsersService)
    return of()
  }
}