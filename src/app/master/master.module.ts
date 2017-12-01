import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from "@angular/router";
import { DepartmentComponent } from './department/department.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [DashboardComponent, HeaderComponent, DepartmentComponent],
  exports: [HeaderComponent]
})
export class MasterModule { }
