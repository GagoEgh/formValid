import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/userModelDto';
import { UsersService } from '../users.service';



@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  usersData!: UserModel[];
  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.usersData = this.usersService.usersDto;
  }

  delete(user: UserModel) {
    console.log(user)
    this.usersService.usersDto = this.usersData.filter((item: UserModel) => {
      return user.id != item.id
    })
    this.usersData = this.usersService.usersDto;
  }
}
