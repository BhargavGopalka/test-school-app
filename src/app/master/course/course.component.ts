import {Component, OnDestroy, OnInit} from '@angular/core';
import {API, Constant} from '../../utility/constants/constants';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {Course} from './course.model';
import {Department} from '../department/department.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {

  page = 1;
  recordsPerPage = Constant.RECORDS_PER_PAGE;
  totalRecords: number;

  courseForm: FormGroup;
  courseList: Course[];
  deptList: Department[];
  deptErrorMessage: string;
  courseErrorMessage: string;
  selectedCourse: Course;

  formButtonMessage: string;
  showDataGrid = true;
  statusMessage = 'Loading Data. Please wait ...';
  private refreshPage: ISubscription;

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.reloadCourse();
  }

  ngOnDestroy() {
    this.refreshPage.unsubscribe();
  }

  initialMethods() {
    this.getCourseData();
    this.getDepartmentData();
  }

  reloadCourse() {
    this.refreshPage = this.apiManager.getLink().subscribe(() => {
      this.initialMethods();
    });
  }

  createCourseForm(course: Course) {
    this.courseForm = new FormGroup({
      department: new FormControl(course ? course.departmentId : '', Validators.required),
      name: new FormControl(course ? course.name : '', Validators.required)
    });
  }

  deptValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required === true) {
        return this.deptErrorMessage = 'Department is required';
      }
    }
  }

  courseValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required === true) {
        return this.courseErrorMessage = 'Name is required';
      }
    }
  }

  getCourseData() {
    this.apiManager.getAPI(API.COURSE, this.courseParams())
      .subscribe((response) => {
          this.courseList = response.payload.data;
          this.totalRecords = response.pager.totalRecords;
        },
        (error) => {
          this.statusMessage = 'Problem with the service, please try later.';
        });
  }

  getDepartmentData() {
    this.apiManager.getAPI(API.DEPARTMENT)
      .subscribe((response) => {
          this.deptList = response.payload.data;
        },
        (error) => {
          this.statusMessage = 'Problem with the service, Please try later.';
        });
  }

  onSubmitCourse(formValue, valid) {
    if (valid) {
      if (this.selectedCourse) {
        this.apiManager.putAPI(API.COURSE + '/' + this.selectedCourse._id, formValue)
          .subscribe((response) => {
            this.getCourseData();
            this.showDataGrid = true;
          });
      } else {
        this.apiManager.postAPI(API.COURSE, formValue)
          .subscribe((response) => {
            this.getCourseData();
            this.showDataGrid = true;
          });
      }
    }
  }

  onChangeStatus(course: Course) {
    this.apiManager.deleteAPI(API.COURSE + '/' + course._id + '/' + !course.isEnable)
      .subscribe((response) => {
        this.getCourseData();
      });
  }

  onAddEditButtonClick(course?: Course) {
    this.showDataGrid = false;
    this.createCourseForm(course);
    this.formButtonMessage = course ? 'Update' : 'Add';
    this.selectedCourse = course;
  }

  onCancel() {
    this.showDataGrid = true;
  }

  onRecordsPerPageChange(event) {
    this.page = 1;
    this.recordsPerPage = +event;
    this.getCourseData();
  }

  /* Params */
  courseParams(): any {
    return {
      'pageNumber': this.page,
      'recordsPerPage': this.recordsPerPage
    };
  }

}
