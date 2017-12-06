import {Component, OnInit} from '@angular/core';
import {API, Constant} from '../../utility/constants/constants';
import {Professor} from './Professor.model';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';

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

  showDataGrid = true;
  statusMessage = 'Loading Data. Please wait ...';

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.getProfessorData();
  }

  getProfessorData() {
    this.apiManager.getAPI(API.USER, this.queryParams(), this.professorParams())
      .subscribe((response) => {
        this.professorList = response.payload.data;
        this.totalRecords = response.pager.totalRecords;
      });
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
    return {
      'role': 'teacher',
      'userStatus': 'partial',
      'mobileVerified': true
    };
  }

}
