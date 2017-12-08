import {Component, OnInit} from '@angular/core';
import {API, Constant} from '../../utility/constants/constants';
import {Professor} from './Professor.model';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {Department} from '../department/department.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Classes} from '../classes/classes.model';
import * as moment from 'moment';

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
  experienceList: any[] = [];
  assignClassForm: FormGroup;
  selectedProfessor: Professor;
  professorForm: FormGroup;
  filesToUpload: any;

  classErrorMessage: string;
  formButtonMessage: string;
  filterName = '';
  filterProfessorId = '';
  filterDepartment = '';
  showAssignClassesForm = false;
  preventMultipleClick = true;
  showDataGrid = true;
  showAddEditForm = false;
  maxDate = new Date();
  statusMessage = 'Loading Data. Please wait ...';

  firstNameErrorMessage: string;
  lastNameErrorMessage: string;
  departmentErrorMessage: string;
  mobileErrorMessage: string;
  emailErrorMessage: string;

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.getProfessorData();
    this.getDepartmentData();
    this.getClassList();
    this.createProfessorForm();
    this.getExperienceList();
  }

  createProfessorForm(professor?) {
    this.professorForm = new FormGroup({
      firstName: new FormControl(professor ? professor.firstName : '', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      lastName: new FormControl(professor ? professor.lastName : '', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      company: new FormControl(professor ? professor.company : ''),
      professorId: new FormControl(professor ? professor.professorId : ''),
      specialization: new FormControl(professor ? professor.specialization : ''),
      department: new FormControl(professor ? professor.department.departmentId : '', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      joinDate: new FormControl(professor ? professor.joinDate : ''),
      experience: new FormControl(professor ? professor.experience : ''),
      gender: new FormControl(professor ? professor.gender : 'Male'),
      birthDate: new FormControl(professor ? professor.birthDate : ''),
      mobileNumber: new FormControl(professor ? professor.mobileNumber : '', {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(11)],
        updateOn: 'blur'
      }),
      email: new FormControl(professor ? professor.email : '', {validators: [Validators.required], updateOn: 'blur'}),
      address: new FormControl(professor ? professor.address : '')
    });
  }

  firstNameValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required) {
        return this.firstNameErrorMessage = 'First name is required';
      }
    }
  }

  lastNameValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required) {
        return this.lastNameErrorMessage = 'Last name is required';
      }
    }
  }

  departmentValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required) {
        return this.departmentErrorMessage = 'Department is required';
      }
    }
  }

  mobileValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required) {
        return this.mobileErrorMessage = 'Mobile Number is required';
      }
      if ((control.value.length < 10) || (control.value.length > 11)) {
        return this.mobileErrorMessage = 'Mobile Number must be 10 or 11 digits long';
      }
    }
  }

  emailValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required) {
        return this.emailErrorMessage = 'Email is required';
      }
    }
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

  getExperienceList() {
    for (let i = 1; i <= 50; i++) {
      this.experienceList.push(i);
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

  onAddEditProfessorFrom(formValue, valid) {
    for (const property in formValue) {
      if (formValue[property] === null || formValue[property] === '') {
        delete formValue[property];
      }
    }
    const value = formValue;
    if (valid) {
      if (value.joinDate) {
        value.joinDate = moment(value.joinDate).format('YYYY/MM/DD');
      }
      if (value.birthDate) {
        value.birthDate = moment(value.birthDate).format('YYYY/MM/DD');
      }
      formValue['role'] = 'teacher';
      if (this.selectedProfessor) {
        debugger;
        this.apiManager.putAPI(API.UPDATE_USER + '/' + this.selectedProfessor._id, value, this.filesToUpload)
          .subscribe((response) => {
            this.showDataGrid = true;
            this.showAddEditForm = false;
            this.getProfessorData();
          });
      } else {
        this.apiManager.postAPI(API.ADD_USER, value, this.filesToUpload)
          .subscribe((response) => {
            this.showDataGrid = true;
            this.showAddEditForm = false;
            this.getProfessorData();
          });
      }
    }
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    this.filesToUpload = fileList;
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

  onLeaveFormView() {
    this.showAddEditForm = false;
    this.showDataGrid = true;
  }

  professorFormDisable(disable) {

    const firstName = this.professorForm.get('firstName');
    disable ? firstName.disable() : firstName.enable();

    const lastName = this.professorForm.get('lastName');
    disable ? lastName.disable() : lastName.enable();

    const company = this.professorForm.get('company');
    disable ? company.disable() : company.enable();

    const professorId = this.professorForm.get('professorId');
    disable ? professorId.disable() : professorId.enable();

    const specialization = this.professorForm.get('specialization');
    disable ? specialization.disable() : specialization.enable();

    const department = this.professorForm.get('department');
    disable ? department.disable() : department.enable();

    const joinDate = this.professorForm.get('joinDate');
    disable ? joinDate.disable() : joinDate.enable();

    const experience = this.professorForm.get('experience');
    disable ? experience.disable() : experience.enable();

    const gender = this.professorForm.get('gender');
    disable ? gender.disable() : gender.enable();

    const birthDate = this.professorForm.get('birthDate');
    disable ? birthDate.disable() : birthDate.enable();

    const mobileNumber = this.professorForm.get('mobileNumber');
    disable ? mobileNumber.disable() : mobileNumber.enable();

    const email = this.professorForm.get('email');
    disable ? email.disable() : email.enable();

    const address = this.professorForm.get('address');
    disable ? address.disable() : address.enable();

  }

  onAddButtonClick() {
    this.showAddEditForm = true;
    this.showDataGrid = false;
    this.selectedProfessor = null;
    this.formButtonMessage = 'Add';
    this.createProfessorForm();
  }

  onEditViewButtonClick(professor: Professor, message: string) {
    this.showAddEditForm = true;
    this.showDataGrid = false;
    this.formButtonMessage = message;
    this.selectedProfessor = professor;
    this.createProfessorForm(this.selectedProfessor);
    if (this.formButtonMessage === 'View') {
      this.professorFormDisable(true);
    } else {
      this.professorFormDisable(false);
    }
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
