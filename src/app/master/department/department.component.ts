import {Component, OnInit} from '@angular/core';
import {Department} from './department.model';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {API} from '../../utility/constants/constants';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  deptList: Department[] = [];

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.getDeptData();
  }

  getDeptData() {
    this.apiManager.getAPI(API.DEPARTMENT)
      .subscribe((response) => {
        this.deptList = response.payload.data;
      });
  }

  onChangeStatus(id: string, isEnable: boolean) {
    const enableDisable = !isEnable;
    this.apiManager.deleteAPI(API.DEPARTMENT + '/' + id + '/' + enableDisable)
      .subscribe((response) => {
          this.getDeptData();
        }
        // ,
        // (error) => {
        //   isEnable = !isEnable;
        // }
        );
  }

}
