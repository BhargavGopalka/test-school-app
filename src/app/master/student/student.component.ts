import {Component, OnInit} from '@angular/core';
import {API, Constant} from '../../utility/constants/constants';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {Student} from './student.model';
import {Classes} from '../classes/classes.model';

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

  filterName = '';
  filterApplicationId = '';
  filterClass = '';
  showDataGrid = true;
  preventMultipleClick = true;
  statusMessage = 'Loading Data. Please wait ...';

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.getStudentData();
    this.getClassData();
  }

  getStudentData() {
    this.apiManager.getAPI(API.USER, this.queryParams(), this.professorParams())
      .subscribe((response) => {
        this.studentList = response.payload.data;
        this.totalRecords = response.pager.totalRecords;
        this.preventMultipleClick = true;
      });
  }

  getClassData() {
    this.apiManager.getAPI(API.CLASS, {'records': 'all'})
      .subscribe((response) => {
        this.classesList = response.payload.data;
      });
  }

  onClickSearchButton() {
    this.getStudentData();
  }

  onClear() {
    this.filterClass = '';
    this.filterApplicationId = '';
    this.filterName = '';
  }

  onRecordsPerPageChange(value) {
    this.page = 1;
    this.recordsPerPage = +value;
    this.getStudentData();
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
