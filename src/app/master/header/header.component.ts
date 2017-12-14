import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {ApiManagerService} from '../../utility/api-manager/api-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoading = true;

  constructor(private routes: Router,
              private apiManager: ApiManagerService,
              private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.settingLoader();
  }

  private settingLoader() {
    this.apiManager.getLoader()
      .subscribe((loading) => {
        this.isLoading = loading;
        this.cdRef.detectChanges();
      });
  }

  onLogOut() {
    sessionStorage.clear();
    this.routes.navigate(['login']);
  }

}
