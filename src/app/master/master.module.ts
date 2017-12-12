import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {DepartmentComponent} from './department/department.component';
import {UtilityModule} from '../utility/utility.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CourseComponent} from './course/course.component';
import {ClassesComponent} from './classes/classes.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReportComponent } from './report/report.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ProfessorComponent } from './professor/professor.component';
import { StudentComponent } from './student/student.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    UtilityModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    RouterModule
  ],
  declarations: [DashboardComponent, HeaderComponent, DepartmentComponent, CourseComponent, ClassesComponent, FeedbackComponent, ReportComponent, AttendanceComponent, ProfessorComponent, StudentComponent, ProfileComponent],
  exports: [HeaderComponent]
})
export class MasterModule {
}
