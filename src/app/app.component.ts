import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeader = false;

  constructor(private _router: Router) {}

  ngOnInit() {
  }

  get headerView(): Boolean {
    const checkToken = sessionStorage.getItem('Authorization');
    const token = checkToken ? atob(checkToken) : null;

    if (token) {
      this.showHeader = true;
    } else {
      this.showHeader = false;
    }
    return this.showHeader;
  }

}
