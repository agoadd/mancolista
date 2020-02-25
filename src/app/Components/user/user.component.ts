import { Component, OnInit } from '@angular/core';
import { User } from './../../Modules/user';
import { UsersService } from './../../Services/users.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: User;

  constructor(private service: UsersService) { }

  ngOnInit(): void {
    this.service.getUser("LeJVmnKxhsv69PmS2upU").subscribe(user => {
      this.user = user.payload.data();
      this.user.collections.forEach(collection => {
        collection.duplicateStickers = collection.ownedStickers.filter(x => x.quantity > 1);
        collection.missingStickers = collection.ownedStickers.filter(x => x.quantity == 0);
      });
    });

    $('.nav .nav-tabs a').on('click', function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
  }
}
