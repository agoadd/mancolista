import { Component, OnInit } from '@angular/core';
import { User } from './../../Modules/user';
import { UsersService } from './../../Services/users.service';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: User;

  constructor(private userService: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(this.route.snapshot.paramMap.get('id')).subscribe(user => {
      this.user = user.payload.data();
    });
  }

}
