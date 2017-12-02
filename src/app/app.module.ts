import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {UserAuthModule} from './user-auth/user-auth.module';
import {UserAuthRoutingModule} from './user-auth/user-auth-routing.module';
import {UtilityModule} from './utility/utility.module';
import {MasterModule} from './master/master.module';
import {MasterRoutingModule} from './master/master-routing.module';
import {AuthGuard} from './_guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserAuthModule,
    UserAuthRoutingModule,
    UtilityModule,
    MasterModule,
    MasterRoutingModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
}
