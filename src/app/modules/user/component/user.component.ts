import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../../core/authentication/services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getLoggedUser();
  }
}
