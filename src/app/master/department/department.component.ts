import {Component, OnInit} from '@angular/core';
import {Department} from './department.model';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {API, Constant} from '../../utility/constants/constants';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  page = 1;
  recordsPerPage = Constant.RECORDS_PER_PAGE;
  totalRecords: number;

  showDataGrid = true;

  deptList: Department[];
  departmentFrom: FormGroup;
  formButtonMessage: string;
  selectedDepartment: Department;

  nameErrorMessage: string;
  statusMessage = 'Loading Data. Please wait ...';

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.getDeptData();
  }

  createDepartmentForm(department?: Department) {
    this.departmentFrom = new FormGroup({
      name: new FormControl(department ? department.name : '', Validators.required)
    });
  }

  onSubmitDepartment(formValue, valid) {
    if (valid) {
      if (this.selectedDepartment) {
        this.apiManager.putAPI(API.DEPARTMENT + '/' + this.selectedDepartment._id, formValue)
          .subscribe((response) => {
            this.getDeptData();
            this.showDataGrid = true;
          });
      } else {
        this.apiManager.postAPI(API.DEPARTMENT, formValue)
          .subscribe((response) => {
            this.getDeptData();
            this.showDataGrid = true;
          });
      }
    }
  }

  getDeptData() {
    this.apiManager.getAPI(API.DEPARTMENT, this.departmentParams(1))
      .subscribe((response) => {
          this.deptList = response.payload.data;
        },
        (error) => {
          this.statusMessage = 'Problem with the service, please try later.';
        });
  }

  nameValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required === true) {
        return this.nameErrorMessage = 'Name is required';
      }
    }
  }

  onChangeStatus(dept: Department) {
    this.apiManager.deleteAPI(API.DEPARTMENT + '/' + dept._id + '/' + !dept.isEnable)
      .subscribe((response) => {
          this.getDeptData();
        });
  }

  onAddEditButtonClick(department?: Department) {
    this.showDataGrid = false;
    this.createDepartmentForm(department);
    this.formButtonMessage = department ? 'Update' : 'Add';
    this.selectedDepartment = department;
  }

  onRecordsPerPageChange(event) {
    this.page = 1;
    this.recordsPerPage = +event;
    this.getDeptData();
  }

  onCancel() {
    this.showDataGrid = true;
  }

  /* Params */
  departmentParams(pageNumber: number): any {
    return {
      'pageNumber': pageNumber,
      'recordsPerPage': this.recordsPerPage
    };
  }

}
