import {Component, OnInit} from '@angular/core';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {API} from '../../utility/constants/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  teacherCount: string;
  studentCount: string;

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.getCountList();
  }

  getCountList() {
    this.apiManager.getAPI(API.DASHBOARD)
      .subscribe((response: any) => {
        this.teacherCount = response.payload.data.teacherCount;
        this.studentCount = response.payload.data.studentCount;
      });
  }

}
