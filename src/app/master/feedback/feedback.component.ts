import {Component, OnInit} from '@angular/core';
import {API, Constant} from '../../utility/constants/constants';
import {Feedback} from './feedback.model';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {Classes} from '../classes/classes.model';
import * as moment from 'moment';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  page = 1;
  recordsPerPage = Constant.RECORDS_PER_PAGE;
  totalRecords: number;

  showDataGrid = true;
  maxDate = new Date();
  filterStartDate = null;
  filterEndDate = null;
  filterClass = '';
  filterProfessor: any[] = [];
  statusMessage = 'No Record Found!';

  feedbackList: Feedback[];
  selectedFeedback: Feedback;
  classList: Classes[];
  professorList: any[];

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.getFeedbackData();
    this.getClassList();
    this.getProfessorList();
  }

  getClassList() {
    this.apiManager.getAPI(API.CLASS, this.queryParams())
      .subscribe((response) => {
        this.classList = response.payload.data;
      });
  }

  getProfessorList() {
    this.apiManager.getAPI(API.USER, this.queryParams(), this.professorSearchParams())
      .subscribe((response) => {
        this.professorList = response.payload.data;
      });
  }

  getFeedbackData() {
    this.apiManager.getAPI(API.FEEDBACK, this.feedbackQueryParams(), this.feedbackSearchParams())
      .subscribe((response) => {
          this.feedbackList = response.payload.data;
          this.totalRecords = response.pager.totalRecords;
        },
        (error) => {
          this.statusMessage = 'Problem with the service, please try later.';
        });
  }

  onViewButtonClick(feedback: Feedback) {
    this.showDataGrid = false;
    this.selectedFeedback = feedback;
  }

  leaveFeedbackView() {
    this.selectedFeedback = null;
    this.showDataGrid = true;
  }

  onClickSearchButton() {
    this.getFeedbackData();
  }

  onClear() {
    this.filterStartDate = null;
    this.filterEndDate = null;
  }

  onRecordsPerPageChange(event) {
    this.page = 1;
    this.recordsPerPage = +event;
    this.getFeedbackData();
  }

  /* Params */
  feedbackQueryParams(): any {
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

  professorSearchParams(): any {
    return {
      role: 'teacher',
      isEnable: true
    };
  }

  feedbackSearchParams(): any {
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
      searchParams['teacher'] = this.filterProfessor;
    }
    return searchParams;
  }

}
