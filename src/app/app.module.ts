import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './components/app.component';
import { HttpModule }   from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent }   from './components/home';
import { NotFoundComponent }   from './components/not-found';
import { ModuleWithProviders }  from '@angular/core';
import {iframeComponent}   from './components/iframe';
import {SideBar}   from './components/SideBar';
import {Search }   from './components/search';
import {SafeHtml} from './pipes/sub.pipe';
import {SafePipe} from './pipes/iframe.pipe';
import {ViewPipe} from './pipes/view.pipe';
const appRoutes: Routes =[		
    { path: '', component: HomeComponent},
    { path: ':search',component: iframeComponent},
    { path: ':search/:id', component: iframeComponent},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpModule,RouterModule.forRoot(appRoutes),],
  declarations: [ AppComponent,HomeComponent,NotFoundComponent,iframeComponent,SideBar,Search,SafeHtml,SafePipe,ViewPipe],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
