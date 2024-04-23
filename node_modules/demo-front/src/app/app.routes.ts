import { Routes } from '@angular/router';

import { HomeComponent } from './page/home/home.component';
import { UsersComponent } from './page/users/users.component';
import { ValidateComponent } from './page/validate/validate.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'validate', component: ValidateComponent },
  { path: '**', redirectTo: 'home' }
];
