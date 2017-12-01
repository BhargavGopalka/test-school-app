import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ApiManagerService} from './api-manager/api-manager.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ApiManagerService]
})
export class UtilityModule {
}
