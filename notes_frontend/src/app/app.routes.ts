import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AppComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
