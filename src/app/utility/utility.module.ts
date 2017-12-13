import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ApiManagerService} from './api-manager/api-manager.service';
import {PaginationComponent} from './common-component/pagination/pagination.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProgressHudComponent } from './common-component/progress-hud/progress-hud.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [ApiManagerService],
  declarations: [PaginationComponent, ProgressHudComponent],
  exports: [PaginationComponent, NgxPaginationModule, ProgressHudComponent]
})
export class UtilityModule {
}
