import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ApiManagerService} from './api-manager/api-manager.service';
import {PaginationComponent} from './common-component/pagination/pagination.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ProgressHudComponent} from './common-component/progress-hud/progress-hud.component';
import {DebounceClickDirective} from './common-functions/debounce-click/debounce-click.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [ApiManagerService],
  declarations: [PaginationComponent, ProgressHudComponent, DebounceClickDirective],
  exports: [PaginationComponent, NgxPaginationModule, ProgressHudComponent, DebounceClickDirective]
})
export class UtilityModule {
}
