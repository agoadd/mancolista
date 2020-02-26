import { AuthenticationService } from './../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from './../../Modules/user';
import * as $ from 'jquery';
import { Observable, from, observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: User;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.user = user.payload.data();
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }
}