import { Component } from '@angular/core';
import { AuthenticationService } from './core/authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mancolista';

  constructor(public authService: AuthenticationService) { }

  public logout(): void {
    this.authService.signOut();
  }
}
