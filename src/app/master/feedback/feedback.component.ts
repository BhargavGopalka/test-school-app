import {Component, OnInit} from '@angular/core';
import {Constant} from '../../utility/constants/constants';

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

  constructor() {
  }

  ngOnInit() {
  }

}
