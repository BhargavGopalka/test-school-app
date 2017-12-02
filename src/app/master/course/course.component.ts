import {Component, OnInit} from '@angular/core';
import {API, Constant} from '../../utility/constants/constants';
import {ApiManagerService} from "../../utility/api-manager/api-manager.service";
import {Course} from "./course.model";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  page = 1;
  recordsPerPage = Constant.RECORDS_PER_PAGE;
  totalRecords: number;

  courseList: Course[];

  showDataGrid = true;
  statusMessage = 'Loading Data. Please wait ...';

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.getCourseData();
  }

  getCourseData() {
    this.apiManager.getAPI(API.COURSE, this.courseParams(1))
      .subscribe((response) => {
          this.courseList = response.payload.data;
        },
        (error) => {
          this.statusMessage = 'Problem with the service, please try later.';
        });
  }

  /* Params */
  courseParams(pageNumber: number): any {
    return {
      'pageNumber': pageNumber,
      'recordsPerPage': this.recordsPerPage
    };
  }

}
