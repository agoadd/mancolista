import { Component, OnInit } from '@angular/core';
import { User } from './../../Modules/user';
import { UsersService } from './../../Services/users.service';
import * as $ from 'jquery';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: User;

  constructor(private service: UsersService) { }

  ngOnInit(): void {
    this.service.getUser("vkCz3DS61th7OzQ17UVj").subscribe(user => { 
      this.user = user.payload.data(); 
    });
    
    $('.nav .nav-tabs a').on('click', function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
  }
}
