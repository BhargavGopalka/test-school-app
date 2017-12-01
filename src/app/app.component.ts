import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showHeader = false;

  ngOnInit() {
  }

  get headerView(): Boolean {
    const token = sessionStorage.getItem('Authorization');
    if (token) {
      this.showHeader = true;
    } else {
      this.showHeader = false;
    }
    return this.showHeader;
  }

}
