import {Component, OnInit} from '@angular/core';
import {API, Constant} from '../../utility/constants/constants';
import {Report} from '../report/report.model';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {Classes} from '../classes/classes.model';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  page = 1;
  recordsPerPage = Constant.RECORDS_PER_PAGE;
  totalRecords: number;

  attendanceList: Report[];
  classList: Classes[];
  professorList: any[];

  showDataGrid = true;
  maxDate = new Date();
  filterEndDate = new Date();
  filterStartDate = new Date(new Date().setDate(this.filterEndDate.getDate() - 90));
  filterClass = '';
  filterProfessor: any[] = [];
  statusMessage = 'No Attendance Report';

  constructor(private apiManager: ApiManagerService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.getAttendanceData();
    this.getClassData();
    this.getProfessorList();
  }

  getAttendanceData() {
    if (this.filterStartDate && this.filterEndDate && this.filterClass) {
      this.apiManager.getAPI(API.ATTENDANCE, this.queryParams(), this.searchParams())
        .subscribe((response) => {
            this.attendanceList = response.payload.data;
            this.totalRecords = response.pager.totalRecords;
            this.presentAbsentStudent();
          },
          (error) => {
            this.statusMessage = 'Problem with the service, Please try later.';
          });
    }
  }

  getProfessorList() {
    this.apiManager.getAPI(API.USER, {records: 'all'}, this.professorSearchParams())
      .subscribe((response) => {
        this.professorList = response.payload.data;
      });
  }

  getClassData() {
    this.apiManager.getAPI(API.CLASS, {records: 'all'}, {isEnable: true})
      .subscribe((response) => {
        this.classList = response.payload.data;
      });
  }

  presentAbsentStudent() {
    for (let i = 0; i < this.attendanceList.length; i++) {
      const presentArray = this.attendanceList[i].studentData.filter(student => student.status === 'P');
      this.attendanceList[i].present = presentArray.length;
      const absentArray = this.attendanceList[i].studentData.filter(student => student.status === 'A');
      this.attendanceList[i].absent = absentArray.length;
    }
  }

  onRecordsPerPageChange(event) {
    this.page = 1;
    this.recordsPerPage = +event;
    this.getAttendanceData();
  }

  onClickSearchButton() {
    if (!this.filterStartDate) {
      this.toastr.error('Select Start Date');
    } else {
      if (!this.filterEndDate) {
        this.toastr.error('Select End Date');
      } else {
        if (!this.filterClass) {
          this.toastr.error('Select Class');
        } else {
          this.getAttendanceData();
        }
      }
    }
  }

  onClear() {
    this.filterStartDate = null;
    this.filterEndDate = null;
    this.filterClass = null;
    this.filterProfessor = [];
  }

  /* Params */
  queryParams(): any {
    return {
      'pageNumber': this.page,
      'recordsPerPage': this.recordsPerPage
    };
  }

  professorSearchParams(): any {
    return {
      role: 'teacher',
      isEnable: true
    };
  }

  searchParams(): any {
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
    if (this.filterProfessor.length > 0) {
      searchParams['teacher'] = JSON.stringify(this.filterProfessor);
    }
    return searchParams;
  }

}
