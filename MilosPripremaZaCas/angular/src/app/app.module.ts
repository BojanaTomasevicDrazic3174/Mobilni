import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent }  from './app.component';
import { appRoutes } from './app.router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchPipe } from './pages/pipes/search';
import { HttpModule } from '@angular/http';

// komponente i servisi 
import HomeComponent from './pages/home/home.component';

import RegisterComponent from './pages/register/register.component';

import LoginComponent from './pages/login/login.component';
import {RegisterService} from './services/register.service';
import {LoginService} from './services/login.service';
import {AddBrandService} from './services/addbrand.service';
import GetMobilniService from './services/getMobilni.service';
import GetPorudzbineService from './services/getPorudznine.service';
import AddPorudzbinaService from './services/addPorudzbina.service';
import CheckUserByIdService from './services/checkUserById.service';
import CheckUserService from './services/checkUser.service';
import DeleteMobilniService from './services/deleteMobilni.service';
import DeletePorudzbinaService from './services/deletePorudzbina.service';
import AddBrandComponent from './pages/addbrand/addbrand.component';
import BrandService from './services/brand.service';
import BrandComponent from './pages/brand/brand';
import AddMobilniComponent from './pages/addmobilni/addmobilni.component';
import AddMobilniService from './services/addmobilni.service';
import MobilniComponent from './pages/mobilni/mobilni.component';
import PorudzbineComponent from './pages/porudzbine/porudzbine.component';
@NgModule({
  imports:      [
     BrowserModule,
      RouterModule.forRoot(appRoutes),
       ReactiveFormsModule,
       FormsModule,
        HttpModule ],
  declarations: [
     AppComponent,
      HomeComponent,
       RegisterComponent,
        LoginComponent,
         AddBrandComponent,
          BrandComponent,
          AddMobilniComponent,
          MobilniComponent,
          SearchPipe,
          PorudzbineComponent ],
  providers: [ RegisterService,
     LoginService,
      AddBrandService,
      BrandService,
      AddMobilniService,
      GetMobilniService,
      AddPorudzbinaService,
      GetPorudzbineService,
      CheckUserService,
      DeleteMobilniService,
      DeletePorudzbinaService,
    CheckUserByIdService  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {


}
