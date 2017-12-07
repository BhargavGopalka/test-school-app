import {Component, OnInit} from '@angular/core';
import {API, Constant} from '../../utility/constants/constants';
import {Professor} from './Professor.model';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {Department} from '../department/department.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Classes} from '../classes/classes.model';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  page = 1;
  recordsPerPage = Constant.RECORDS_PER_PAGE;
  totalRecords: number;

  professorList: Professor[];
  departmentList: Department[];
  classesList: Classes[];
  assignClassForm: FormGroup;
  selectedProfessor: Professor;
  professorForm: FormGroup;

  classErrorMessage: string;
  filterName = '';
  filterProfessorId = '';
  filterDepartment = '';
  showAssignClassesForm = false;
  preventMultipleClick = true;
  showDataGrid = true;
  showAddEditForm = false;
  statusMessage = 'Loading Data. Please wait ...';

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.getProfessorData();
    this.getDepartmentData();
    this.getClassList();
    this.createProfessorForm();
  }

  createProfessorForm() {
    this.professorForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      company: new FormControl(''),
      professorId: new FormControl(''),
      specialization: new FormControl(''),
      department: new FormControl(''),
      joinDate: new FormControl(''),
      experience: new FormControl(''),
      gender: new FormControl(''),
      birthDate: new FormControl(''),
      mobileNumber: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl('')
    });
  }

  createClassForm(professor?) {
    this.assignClassForm = new FormGroup({
      classNames: new FormControl(professor ? professor.allocatedClass : '', Validators.required)
    });
  }

  classValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else if (control.errors.required === true) {
      return this.classErrorMessage = 'Classes required';
    }
  }

  getProfessorData() {
    this.apiManager.getAPI(API.USER, this.queryParams(), this.professorParams())
      .subscribe((response) => {
        this.professorList = response.payload.data;
        this.totalRecords = response.pager.totalRecords;
        this.preventMultipleClick = true;
      });
  }

  getDepartmentData() {
    this.apiManager.getAPI(API.DEPARTMENT, {'records': 'all'})
      .subscribe((response) => {
        this.departmentList = response.payload.data;
      });
  }

  getClassList() {
    this.apiManager.getAPI(API.CLASS, {'records': 'all'})
      .subscribe((response) => {
        this.classesList = response.payload.data;
      });
  }

  onChangeStatus(professor: Professor) {
    if (this.preventMultipleClick) {
      this.apiManager.deleteAPI(API.USER + '/' + professor._id + '/' + !professor.isEnable)
        .subscribe((response) => {
          this.getProfessorData();
        });
      this.preventMultipleClick = false;
    }
  }

  onSubmitAssignClass(formValue, valid) {
    if (valid) {
      const allocateClasses = [];
      for (let i = 0; i < formValue['classNames'].length; i++) {
        const classesId = formValue['classNames'][i]._id;
        allocateClasses.push(classesId);
      }
      formValue['classes'] = JSON.stringify(allocateClasses);
      formValue['teacherId'] = this.selectedProfessor._id;
      this.apiManager.putAPI(API.ASSIGN_CLASSES, formValue)
        .subscribe((response) => {
          this.showAssignClassesForm = false;
          this.showDataGrid = true;
          this.getProfessorData();
        });
    }
  }

  onClickAddProfessor() {
    this.showAddEditForm = true;
    this.showDataGrid = false;
  }

  onCancelAssignClassView() {
    this.showDataGrid = true;
    this.showAssignClassesForm = false;
  }

  onAssignClasses(professor: Professor) {
    this.selectedProfessor = professor;
    for (let i = 0; i < professor.allocatedClass.length; i++) {
      this.selectedProfessor.allocatedClass[i]['name'] = this.selectedProfessor.allocatedClass[i]['className'];
      this.selectedProfessor.allocatedClass[i]['_id'] = this.selectedProfessor.allocatedClass[i]['classId'];
    }
    this.createClassForm(this.selectedProfessor);
    this.showAssignClassesForm = true;
    this.showDataGrid = false;
  }

  onClickSearchButton() {
    this.getProfessorData();
  }

  onClear() {
    this.filterName = '';
    this.filterDepartment = '';
    this.filterProfessorId = '';
    // this.getProfessorData();
  }

  onRecordsPerPageChange(event) {
    this.page = 1;
    this.recordsPerPage = +event;
    this.getProfessorData();
  }

  /* Params */
  queryParams(): any {
    return {
      'pageNumber': this.page,
      'recordsPerPage': this.recordsPerPage
    };
  }

  professorParams(): any {
    const searchParams = {
      role: 'teacher',
      userStatus: 'partial',
      mobileVerified: true
    };

    if (this.filterName) {
      searchParams['name'] = this.filterName;
    }
    if (this.filterProfessorId) {
      searchParams['professorId'] = this.filterProfessorId;
    }
    if (this.filterDepartment) {
      searchParams['department'] = this.filterDepartment;
    }

    return searchParams;
  }

}
