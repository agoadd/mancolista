import { AuthenticationService } from './Services/authentication.service';
import { Component } from '@angular/core';

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
