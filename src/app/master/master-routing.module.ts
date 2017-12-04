import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../_guards/auth.guard';
import {DepartmentComponent} from './department/department.component';
import {CourseComponent} from './course/course.component';
import {ClassesComponent} from './classes/classes.component';
import {FeedbackComponent} from './feedback/feedback.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'department',
    component: DepartmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'course',
    component: CourseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'class',
    component: ClassesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MasterRoutingModule {
}
