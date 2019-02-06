import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loggedIn: boolean;

  constructor(private authService: AuthService) {
    
  }

  ngOnInit() {
    this.authService.loggedInChanged.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  ngOnDestroy() {
    this.authService.loggedInChanged.unsubscribe();
  }

  toggleLogInOut() {
    this.authService.toggleLogInOut();
  }
}
