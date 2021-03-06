import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import navigation route.
import { RouterModule, Routes } from '@angular/router';

// Import components
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { RegistrationComponent } from './registration/registration.component';
import { TweetComponent } from './account/tweet.component';
import { LoginComponent } from './login/login.component';

// Import smart routing
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Import HttpClient
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Import form module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import authentication
import { AuthenticationService } from './service/authentication.service';
import { AlertService } from './service/alert.service';

import { AccountService } from './service/account.service';
import { UsersComponent } from './users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OtheruserComponent } from './otheruser/otheruser.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'profile',
    component: AccountComponent
  },
  {
    path: 'profiles',
    component: UsersComponent
  },
  {
    path: 'otheruser',
    component: OtheruserComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    AccountComponent,
    TweetComponent,
    LoginComponent,
    UsersComponent,
    OtheruserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes, {
        useHash: false
      }
    )
  ],
  providers: [
    AuthenticationService,
    AlertService,
    AccountService,
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
