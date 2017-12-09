import {Component, OnInit} from '@angular/core';
import {API, Constant} from '../../utility/constants/constants';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {Student} from './student.model';
import {Classes} from '../classes/classes.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  page = 1;
  recordsPerPage = Constant.RECORDS_PER_PAGE;
  totalRecords: number;

  studentList: Student[];
  classesList: Classes[];
  studentForm: FormGroup;
  selectedStudent: Student;
  editedClassList: any[];
  filesToUpload: any;
  yearList: any[] = [];

  filterName = '';
  filterApplicationId = '';
  filterClass = '';
  formButtonMessage: string;
  showDataGrid = true;
  showAddEditForm = false;
  preventMultipleClick = true;

  maxDate = new Date();
  firstNameErrorMessage: string;
  lastNameErrorMessage: string;
  mobileErrorMessage: string;
  emailErrorMessage: string;
  statusMessage = 'Loading Data. Please wait ...';

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.getStudentData();
    this.getClassData();
    this.createStudentForm();
    this.getYearList();
  }

  createStudentForm(student?) {
    this.studentForm = new FormGroup({
      firstName: new FormControl(student ? student.firstName : '', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      lastName: new FormControl(student ? student.lastName : '', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      applicationId: new FormControl(student ? student.applicationId : ''),
      offerAcceptanceDate: new FormControl(student ? student.offerAcceptanceDate : ''),
      yearOfFirstJob: new FormControl(student ? student.yearOfFirstJob : ''),
      finalGrade: new FormControl(student ? student.finalGrade : ''),
      class: new FormControl(student ? student.studentClass.classId : ''),
      studentId: new FormControl(student ? student.studentId : ''),
      gender: new FormControl(student ? student.gender : 'Male'),
      birthDate: new FormControl(student ? student.birthDate : ''),
      mobileNumber: new FormControl(student ? student.mobileNumber : '', {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
        updateOn: 'blur'
      }),
      email: new FormControl(student ? student.email : '', {validators: [Validators.required], updateOn: 'blur'}),
      address: new FormControl(student ? student.address : '')
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

  mobileValidation(control: AbstractControl) {
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required) {
        return this.mobileErrorMessage = 'Mobile Number is required';
      }
      if ((control.value.length < 10) || (control.value.length > 10)) {
        return this.mobileErrorMessage = 'Mobile Number must be exact 10 digits long';
      }
    }
  }

  emailValidation(control: AbstractControl) {
    // The Email must be of spjain.org domain.
    if (control.errors === null) {
      return null;
    } else {
      if (control.errors.required) {
        return this.emailErrorMessage = 'Email is required';
      }
    }
  }

  getStudentData() {
    this.apiManager.getAPI(API.USER, this.queryParams(), this.studentParams())
      .subscribe((response) => {
        this.studentList = response.payload.data;
        this.totalRecords = response.pager.totalRecords;
        this.preventMultipleClick = true;
      });
  }

  getClassData() {
    this.apiManager.getAPI(API.CLASS, {'records': 'all'}, {isEnable: true})
      .subscribe((response) => {
        this.classesList = response.payload.data;
      });
  }

  getEditedClassData() {
    if (this.classesList) {
      this.editedClassList = this.classesList.map((response) => {
        return {classId: response._id, className: response.name};
      });
      console.log(this.editedClassList);
    }
  }

  getYearList() {
    const date = new Date();
    const currentYear = date.getFullYear();
    for (let i = 1980; i <= currentYear; i++) {
      this.yearList.push(i);
    }
  }

  onAddEditStudentFrom(formValue, valid) {
    const value = JSON.parse(JSON.stringify(formValue));

    if (valid) {
      if (value.offerAcceptanceDate) {
        value.offerAcceptanceDate = moment(value.offerAcceptanceDate).format('YYYY/MM/DD');
      }
      if (value.birthDate) {
        value.birthDate = moment(value.birthDate).format('YYYY/MM/DD');
      }
      value['role'] = 'student';

      if (this.selectedStudent) {
        this.apiManager.putAPI(API.UPDATE_USER + '/' + this.selectedStudent._id, value, this.filesToUpload)
          .subscribe((response) => {
            this.showDataGrid = true;
            this.showAddEditForm = false;
            this.getStudentData();
          });
      } else {
        this.apiManager.postAPI(API.ADD_USER, value, this.filesToUpload)
          .subscribe((response) => {
            this.showDataGrid = true;
            this.showAddEditForm = false;
            this.getStudentData();
          });
      }
    }
  }

  onChangeStatus(student: Student) {
    if (this.preventMultipleClick) {
      this.preventMultipleClick = false;
      this.apiManager.deleteAPI(API.USER + '/' + student._id + '/' + !student.isEnable)
        .subscribe((response) => {
          this.getStudentData();
        });
    }
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    this.filesToUpload = fileList;
  }

  onClickSearchButton() {
    this.getStudentData();
  }

  onLeaveFormView() {
    this.showAddEditForm = false;
    this.showDataGrid = true;
  }

  onAddButtonClick() {
    this.getEditedClassData();
    this.showAddEditForm = true;
    this.showDataGrid = false;
    this.selectedStudent = null;
    this.formButtonMessage = 'Add';
    this.createStudentForm();
  }

  onEditViewButtonClick(student: Student, message: string) {
    this.getEditedClassData();
    this.showAddEditForm = true;
    this.showDataGrid = false;
    this.formButtonMessage = message;
    this.selectedStudent = student;
    this.createStudentForm(this.selectedStudent);
    if (this.formButtonMessage === 'View') {
      this.studentFormDisable(true);
    } else {
      this.studentFormDisable(false);
    }
  }

  onClear() {
    this.filterClass = '';
    this.filterApplicationId = '';
    this.filterName = '';
  }

  onRecordsPerPageChange(value) {
    this.page = 1;
    this.recordsPerPage = +value;
    this.onClear();
    this.getStudentData();
  }

  onPageChange(event) {
    this.page = event;
    this.onClear();
    this.getStudentData();
  }

  studentFormDisable(disable) {
    const firstName = this.studentForm.get('firstName');
    disable ? firstName.disable() : firstName.enable();

    const lastName = this.studentForm.get('lastName');
    disable ? lastName.disable() : lastName.enable();

    const applicationId = this.studentForm.get('applicationId');
    disable ? applicationId.disable() : applicationId.enable();

    const offerAcceptanceDate = this.studentForm.get('offerAcceptanceDate');
    disable ? offerAcceptanceDate.disable() : offerAcceptanceDate.enable();

    const yearOfFirstJob = this.studentForm.get('yearOfFirstJob');
    disable ? yearOfFirstJob.disable() : yearOfFirstJob.enable();

    const finalGrade = this.studentForm.get('finalGrade');
    disable ? finalGrade.disable() : finalGrade.enable();

    const studentClass = this.studentForm.get('class');
    disable ? studentClass.disable() : studentClass.enable();

    const studentId = this.studentForm.get('studentId');
    disable ? studentId.disable() : studentId.enable();

    const gender = this.studentForm.get('gender');
    disable ? gender.disable() : gender.enable();

    const birthDate = this.studentForm.get('birthDate');
    disable ? birthDate.disable() : birthDate.enable();

    const mobileNumber = this.studentForm.get('mobileNumber');
    disable ? mobileNumber.disable() : mobileNumber.enable();

    const email = this.studentForm.get('email');
    disable ? email.disable() : email.enable();

    const address = this.studentForm.get('address');
    disable ? address.disable() : address.enable();
  }

  /* Params */
  queryParams(): any {
    return {
      'pageNumber': this.page,
      'recordsPerPage': this.recordsPerPage
    };
  }

  studentParams(): any {
    const searchParams = {
      role: 'student',
      userStatus: 'partial',
      mobileVerified: true
    };

    if (this.filterName) {
      searchParams['name'] = this.filterName;
    }
    if (this.filterApplicationId) {
      searchParams['applicationId'] = this.filterApplicationId;
    }
    if (this.filterClass) {
      searchParams['classId'] = this.filterClass;
    }
    return searchParams;
  }

}
