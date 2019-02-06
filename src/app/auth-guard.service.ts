import { 
    CanActivate, 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Router,
    CanActivateChild,
    UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild
{
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivateRoute(route, state);
    }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivateRoute(childRoute, state, true);
    }

    private canActivateRoute(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        isChild: boolean = false
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.isAuthenticated().then(
            (authenticated: boolean) => {
                if (authenticated) {
                    return true;
                } else {
                    return isChild ? false : this.router.navigate(['/']);
                }
            }
        )
    }
}