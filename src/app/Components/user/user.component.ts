import { Component, OnInit } from '@angular/core';
import { User } from './../../Modules/user';
import { UsersService } from './../../Services/users.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: User;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUser("pDjgmw75pLIIz5zYxywq").subscribe(user => {
      this.user = user.payload.data();
      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("userId", user.payload.id);
    });
  }

}
