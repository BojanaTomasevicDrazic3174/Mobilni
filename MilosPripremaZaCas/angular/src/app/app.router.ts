import { Routes } from '@angular/router';
import HomeComponent from './pages/home/home.component';
import RegisterComponent from './pages/register/register.component';
import LoginComponent from './pages/login/login.component';
import AddBrandComponent from './pages/addbrand/addbrand.component';
import BrandsComponent from './pages/brand/brand';
import AddMobilniComponent from './pages/addmobilni/addmobilni.component';
import MobilniComponent from './pages/mobilni/mobilni.component';
import PorudzbineComponent from './pages/porudzbine/porudzbine.component';
export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'addbrand', component: AddBrandComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'addmobilni', component: AddMobilniComponent },
  { path: 'mobilni', component: MobilniComponent },
  { path: 'porudzbine', component: PorudzbineComponent },
  
];
