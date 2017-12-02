import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {DepartmentComponent} from './department/department.component';
import {UtilityModule} from '../utility/utility.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CourseComponent } from './course/course.component';

@NgModule({
  imports: [
    CommonModule,
    UtilityModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [DashboardComponent, HeaderComponent, DepartmentComponent, CourseComponent],
  exports: [HeaderComponent]
})
export class MasterModule {
}
