import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BarTopComponent } from './bar-top/bar-top.component';


const appRoutes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    data: { title: 'Auth page' }
  },
  
  // {
  //   path: '',
  //   component: AppComponent,
  //   data: { title: 'App page' }
  // },
  // { path: '',
  //   redirectTo: '/auth',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    BarTopComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes,{ enableTracing: true }     ),
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }