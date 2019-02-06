import { EventEmitter, Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService
{
    loggedInChanged: EventEmitter<boolean> = new EventEmitter();

    loggedIn: boolean = false;

    constructor(private router: Router) {
        
    }

    isAuthenticated() {
        const promise: Promise<boolean> = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 300);
            }
        );
        return promise;
    }

    login(): void {
        this.loggedIn = true;
        this.loggedInChanged.emit(this.loggedIn);
    }

    logout(): void {
        this.loggedIn = false;
        this.loggedInChanged.emit(this.loggedIn);
        this.router.navigate(['/']);
    }

    toggleLogInOut(): void {
        this.loggedIn ? this.logout() : this.login();
    }
}