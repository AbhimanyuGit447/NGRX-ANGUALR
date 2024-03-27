import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthState } from "./reducers";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { isLoggedIn } from "./auth.selector";
import { tap } from "rxjs/operators";


@Injectable({
  providedIn: 'root',
})


class PermissionsService {
  constructor(private router: Router, private store: Store<AuthState>) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap((loggedIn) => {
        if (!loggedIn) {
          console.log('loggedIn', loggedIn);
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}


export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  return inject(PermissionsService).canActivate(next, state);
};
