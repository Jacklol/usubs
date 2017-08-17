import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { HttpModule }   from '@angular/http';
import {Routes, RouterModule} from '@angular/router';
import { AboutComponent }   from './about.component';
import { HomeComponent }   from './home.component';
import { NotFoundComponent }   from './not-found.component';
import { ModuleWithProviders }  from '@angular/core';
import { ItemComponent }   from './item.component';
import { ChildComponent }   from './ChildComponent';
import { FirstPage }   from './first';
import {SafeHtml} from './sub.pipe';
import {SafePipe} from './iframe.pipe';
// определение маршрутов
const appRoutes: Routes =[
    { path: '', component: HomeComponent},
    { path: 'about', component: AboutComponent},
    { path: 'video/:id', component: ItemComponent},
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpModule,RouterModule.forRoot(appRoutes),],
  declarations: [ AppComponent,HomeComponent, AboutComponent, NotFoundComponent,ItemComponent,ChildComponent,FirstPage,SafeHtml,SafePipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
