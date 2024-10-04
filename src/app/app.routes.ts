import { Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', component: TestComponent },
    { path: 'connexion', component: LoginComponent },
    { path: 'test', component: TestComponent },
];
