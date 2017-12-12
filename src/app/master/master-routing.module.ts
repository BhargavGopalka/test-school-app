import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../_guards/auth.guard';
import {DepartmentComponent} from './department/department.component';
import {CourseComponent} from './course/course.component';
import {ClassesComponent} from './classes/classes.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {ReportComponent} from './report/report.component';
import {AttendanceComponent} from './attendance/attendance.component';
import {ProfessorComponent} from './professor/professor.component';
import {StudentComponent} from './student/student.component';
import {ProfileComponent} from './profile/profile.component';

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
  },
  {
    path: 'reports',
    component: ReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'professor',
    component: ProfessorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
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
