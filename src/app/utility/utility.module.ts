import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ApiManagerService} from './api-manager/api-manager.service';
import {PaginationComponent} from './common-component/pagination/pagination.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [ApiManagerService],
  declarations: [PaginationComponent],
  exports: [PaginationComponent, NgxPaginationModule]
})
export class UtilityModule {
}
