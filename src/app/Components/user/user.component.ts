import { AuthenticationService } from './../../Services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getLoggedUser().subscribe((user) => {
      this.authService.updateUserData();
    });
  }
}
