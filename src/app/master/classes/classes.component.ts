import {Component, OnDestroy, OnInit} from '@angular/core';
import {Classes} from './classes.model';
import {API, Constant} from '../../utility/constants/constants';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Course} from '../course/course.model';
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit, OnDestroy {

  page = 1;
  recordsPerPage = Constant.RECORDS_PER_PAGE;
  totalRecords: number;

  courseList: Course[];
  classList: Classes[];
  classForm: FormGroup;
  showDataGrid = true;

  classErrorMessage: string;
  courseErrorMessage: string;
  selectedClass: Classes;
  formButtonMessage: string;
  statusMessage = 'Loading Data. Please wait ...';
  private refreshPage: ISubscription;

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.reloadClasses();
  }

  ngOnDestroy() {
    this.refreshPage.unsubscribe();
  }

  initialMethods() {
    this.getClassData();
    this.getCourseData();
  }

  reloadClasses() {
    this.refreshPage = this.apiManager.getLink().subscribe(() => {
      this.initialMethods();
    });
  }

  createClassForm(classes?: Classes) {
    this.classForm = new FormGroup({
      course: new FormControl(classes ? classes.courseId : '', Validators.required),
      name: new FormControl(classes ? classes.name : '', Validators.required)
    });
  }

  courseValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required === true) {
        return this.courseErrorMessage = 'Course is required';
      }
    }
  }

  classValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required === true) {
        return this.classErrorMessage = 'Class Name is required';
      }
    }
  }

  getCourseData() {
    this.apiManager.getAPI(API.COURSE)
      .subscribe((response) => {
          this.courseList = response.payload.data;
        },
        (error) => {
          this.statusMessage = 'Problem with the service, Please try later.';
        });
  }

  getClassData() {
    this.apiManager.getAPI(API.CLASS, this.classParams())
      .subscribe((response) => {
          this.classList = response.payload.data;
          this.totalRecords = response.pager.totalRecords;
        },
        (error) => {
          this.statusMessage = 'Problem with the service, please try later.';
        });
  }

  onSubmitClass(formValue, valid) {
    if (valid) {
      if (this.selectedClass) {
        this.apiManager.putAPI(API.CLASS + '/' + this.selectedClass._id, formValue)
          .subscribe((response) => {
            this.getClassData();
            this.showDataGrid = true;
          });
      } else {
        this.apiManager.postAPI(API.CLASS, formValue)
          .subscribe((response) => {
            this.getClassData();
            this.showDataGrid = true;
          });
      }
    }
  }

  onChangeStatus(classes: Classes) {
    this.apiManager.deleteAPI(API.CLASS + '/' + classes._id + '/' + !classes.isEnable)
      .subscribe((response) => {
        this.getClassData();
      });
  }

  onAddEditButtonClick(classes?: Classes) {
    this.showDataGrid = false;
    this.createClassForm(classes);
    this.formButtonMessage = classes ? 'Update' : 'Add';
    this.selectedClass = classes;
  }

  onCancel() {
    this.showDataGrid = true;
  }

  onRecordsPerPageChange(event) {
    this.page = 1;
    this.recordsPerPage = +event;
    this.getClassData();
  }

  /* Params */
  classParams(): any {
    return {
      'pageNumber': this.page,
      'recordsPerPage': this.recordsPerPage
    };
  }

}
