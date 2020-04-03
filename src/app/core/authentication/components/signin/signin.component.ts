import { Router } from '@angular/router';
import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './../../../../shared/components/dialog/dialog.component';
import { SpinnerComponent } from './../../../../shared/components/spinner/spinner.component';
import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public showSignIn: boolean;
  public showSignUp: boolean;
  public username: string;
  public email: string;
  public password: string;
  public hide = true;

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(public authService: AuthenticationService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver, private dialog: MatDialog) {
    this.showSignIn = true;
    this.showSignUp = false;
  }

  public toggle(): void {
    this.showSignIn = !this.showSignIn;
    this.showSignUp = !this.showSignUp;
  }

  public signIn(): void {
    this.addSpinnerOverlay();
    this.authService.signIn(this.email, this.password);
  }

  public signUp() {
    this.authService.signUp(this.username, this.email, this.password);
    this.openDialog();
    this.showSignIn = true;
    this.showSignUp = false;
  }

  private openDialog(): void {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = { message: "Abbiamo inviato una mail di conferma all'indirizzo " + this.email + ". Controlla la tua posta e clicca sul link per verificare la mail." }
    this.dialog.open(DialogComponent, dialogConfig);
  }

  // Crea dinamicamente uno SpinnerComponent nel ng-template
  private addSpinnerOverlay(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(SpinnerComponent);
    this.container.createComponent(componentFactory);
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) this.router.navigate(['home']);
    else this.router.navigate(['signin']);
  }
}
