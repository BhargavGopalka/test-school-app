import {Component, OnInit} from '@angular/core';
import {Department} from './department.model';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {API, Constant} from '../../utility/constants/constants';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  page = 1;
  recordsPerPage = Constant.RECORDS_PER_PAGE;
  totalRecords: number;

  deptList: Department[];
  statusMessage = 'Loading Data. Please wait ...';

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.getDeptData();
  }

  getDeptData() {
    this.apiManager.getAPI(API.DEPARTMENT)
      .subscribe((response) => {
          this.deptList = response.payload.data;
        },
        (error) => {
          console.error(error);
          this.statusMessage = 'Problem with the service, please try later.';
        });
  }

  onChangeStatus(dept: Department) {
    this.apiManager.deleteAPI(API.DEPARTMENT + '/' + dept._id + '/' + !dept.isEnable)
      .subscribe((response) => {
          this.getDeptData();
        },
        (error) => {
          dept.isEnable = !dept.isEnable;
        }
      );
  }

}
