import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';
import {API} from '../../utility/constants/constants';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  teacherCount: string;
  studentCount: string;
  private refreshPage: ISubscription;

  constructor(private apiManager: ApiManagerService) {
  }

  ngOnInit() {
    this.initialMethods();
  }

  ngOnDestroy() {
    this.refreshPage.unsubscribe();
  }

  initialMethods() {
    this.refreshPage = this.apiManager.getLink()
      .subscribe(() => {
        this.getCountList();
      });
  }

  getCountList() {
    this.apiManager.getAPI(API.DASHBOARD)
      .subscribe((response: any) => {
        this.teacherCount = response.payload.data.teacherCount;
        this.studentCount = response.payload.data.studentCount;
      });
  }

}
