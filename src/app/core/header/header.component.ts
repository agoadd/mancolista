import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public title = 'Mancolista';

  constructor(public authService: AuthenticationService) { }

  public logout(): void {
    this.authService.signOut();
  }
}
