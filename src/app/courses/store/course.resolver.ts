import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from "@angular/router";

import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { tap, first, finalize, filter } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { AppState } from "../../reducers";
import { loadAllCourses } from "./course.actions";
import { areCoursesLoaded } from "./courses.selectors";

export const CoursesResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<{}> => {
  const store = inject(Store<AppState>);
  let isLoading = false;
  return store.pipe(
    select(areCoursesLoaded),
    tap(coursesLoaded => {
      if (!isLoading && !coursesLoaded) {
        isLoading = true;
        store.dispatch(loadAllCourses());
      }
    }),
    filter(coursesLoaded => coursesLoaded),
    first(),
    finalize(() => (isLoading = false))
  );
};


