import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { Course, compareCourses } from "../model/course";
import { createReducer, on } from "@ngrx/store";
import * as courseActions from './course.actions';


// export interface CoursesState {
//   courses : Course[];
// }

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded : boolean;
}

export const adapter = createEntityAdapter<Course>(
  {
    sortComparer : compareCourses,

  }
);

export const intialCoursesState = adapter.getInitialState({
  allCoursesLoaded : false
});

export const coursesReducer = createReducer(
  intialCoursesState,
  on(
    courseActions.allCoursesLoaded,
    (state, action) => adapter.setAll(
      action.courses,
      {...state, allCoursesLoaded : true}
      )
    ),

    on(
      courseActions.courseUpdated,
      (state, action) => adapter.updateOne(action.update, state)
      )
);

export const {selectAll} = adapter.getSelectors();


