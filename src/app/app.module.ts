import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './components/app.component';
import { HttpModule }   from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
import { NotFoundComponent }   from './components/not-found';
import { ModuleWithProviders }  from '@angular/core';
import {iframeComponent}   from './components/iframe';
import {SideBar}   from './components/sideBar';
import {Search }   from './components/search';
import {SafeHtml} from './pipes/UnsafeHtmlPipe';
import {SafePipe} from './pipes/UnsafeUrlPipe';
import {ViewsPipe} from './pipes/viewsPipe';
const appRoutes: Routes =[		
    { path: '', component: iframeComponent},
    { path: ':search',component: iframeComponent},
    { path: ':search/:id', component: iframeComponent},
    { path: '*', component: NotFoundComponent }
];

@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpModule,RouterModule.forRoot(appRoutes),],
  declarations: [ AppComponent,NotFoundComponent,iframeComponent,SideBar,Search,SafeHtml,SafePipe,ViewsPipe],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
