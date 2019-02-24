import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

import {Routes, RouterModule} from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { TableResultsComponent } from './table-results/table-results.component';
import { DetailForumComponent } from './detail-forum/detail-forum.component'; 
import { ApiService } from './services/api.service';
import {HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path: "details/:id", 
    component: DetailsComponent
  },
  {
    path: "search",
    component: SearchComponent
  }
]; 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    DetailsComponent,
    SearchComponent,
    TableResultsComponent,
    DetailForumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
