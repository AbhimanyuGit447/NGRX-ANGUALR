import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CoursesHttpService } from "../services/courses-http.service";
import * as courseActions from './course.actions'
import { concatMap, map } from "rxjs/operators";

@Injectable()
export class CourseEffect {

  loadCourses$ = createEffect(
    () => this.action$.pipe(
      ofType(courseActions.loadAllCourses),
      concatMap(action => this.coursesHttpService.findAllCourses()),
      map(courses => courseActions.allCoursesLoaded({courses}))
    )
  );

  saveCourse$ = createEffect(
    () => this.action$.pipe(
      ofType(courseActions.courseUpdated),
      concatMap(action => this.coursesHttpService.saveCourse(
        action.update.id,
        action.update.changes
      ))
    ),
    {dispatch : false}
  )

  constructor(private action$ : Actions, private coursesHttpService : CoursesHttpService){

  }

}
