import {Component, OnDestroy, OnInit} from '@angular/core';
import {Report} from './report.model';
import {API, Constant} from '../../utility/constants/constants';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {Classes} from '../classes/classes.model';
import * as moment from 'moment';
import {ISubscription} from "rxjs/Subscription";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {

  page = 1;
  recordsPerPage = Constant.RECORDS_PER_PAGE;
  totalRecords: number;

  maxDate = new Date();
  filterEndDate = new Date();
  filterStartDate = new Date(new Date().setDate(this.filterEndDate.getDate() - 90));
  reportList: Report[];
  classList: Classes[];
  studentList: any[];
  filterClass = '';
  filterStudent = '';
  filterStudentArray: any[];

  showDataGrid = true;
  statusMessage = 'Loading Data. Please wait ...';
  private refreshPage: ISubscription;

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.reloadReport();
  }

  ngOnDestroy() {
    this.refreshPage.unsubscribe();
  }

  initialMethods() {
    this.getReportData();
    this.getClassList();
    this.getStudentList();
  }

  reloadReport() {
    this.refreshPage = this.apiManager.getLink().subscribe(() => {
      this.initialMethods();
    });
  }

  getReportData() {
    this.apiManager.getAPI(API.ATTENDANCE, this.reportParams(), this.reportSearchParams())
      .subscribe((response) => {
          this.reportList = response.payload.data;
          this.totalRecords = response.pager.totalRecords;
          this.presentAbsentStudent();
        },
        (error) => {
          this.statusMessage = 'Problem with the service, Please try later.';
        });
  }

  getClassList() {
    this.apiManager.getAPI(API.CLASS, this.queryParams(), {isEnable: true})
      .subscribe((response) => {
        this.classList = response.payload.data;
      });
  }

  getStudentList() {
    this.apiManager.getAPI(API.USER, this.queryParams(), this.searchParams())
      .subscribe((response) => {
        this.studentList = response.payload.data;
      });
  }

  filterStudentList(value) {
    this.filterStudentArray = this.studentList.filter(response => {
      if (response.studentClass) {
        return response.studentClass.classId === value;
      }
    });
  }

  presentAbsentStudent() {
    for (let i = 0; i < this.reportList.length; i++) {
      const presentStudent: any[] = this.reportList[i].studentData.filter(student => student.status === 'P');
      this.reportList[i].present = presentStudent.length;
      const absentStudent: any[] = this.reportList[i].studentData.filter(student => student.status === 'A');
      this.reportList[i].absent = absentStudent.length;
    }
  }

  onRecordsPerPageChange(event) {
    this.page = 1;
    this.recordsPerPage = +event;
    this.getReportData();
  }

  onClickSearchButton() {
    this.getReportData();
  }

  onClear() {
    this.filterStartDate = null;
    this.filterEndDate = null;
    this.filterClass = null;
    this.filterStudent = null;
    this.getReportData();
  }

  /* Params */
  reportParams(): any {
    return {
      'pageNumber': this.page,
      'recordsPerPage': this.recordsPerPage
    };
  }

  queryParams(): any {
    return {
      records: 'all'
    };
  }

  searchParams(): any {
    return {
      role: 'student',
      isEnable: true
    };
  }

  reportSearchParams(): any {
    const searchParams = {};
    if (this.filterStartDate) {
      searchParams['startDate'] = moment(this.filterStartDate).format('YYYY-MM-DD');
    }
    if (this.filterEndDate) {
      searchParams['endDate'] = moment(this.filterEndDate).format('YYYY-MM-DD');
    }
    if (this.filterClass) {
      searchParams['class'] = this.filterClass;
    }
    if (this.filterStudent) {
      searchParams['student'] = this.filterStudent;
    }
    return searchParams;
  }

}
