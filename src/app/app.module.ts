import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import navigation route.
import { RouterModule, Routes } from '@angular/router';

// Import components
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { RegistrationComponent } from './registration/registration.component';

// Import smart routing
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
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
    AccountComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes, {
        useHash: false
      }
    )
  ],
  providers: [
    {
      provide: LocationStrategy, useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
