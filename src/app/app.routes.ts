import { Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { authGuardGuard } from './services/auth-guard.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'connexion', component: LoginComponent },
    { path: 'accueil', component: HomeComponent, canActivate: [authGuardGuard] },
    { path: 'chat', component: ChatComponent, canActivate: [authGuardGuard] },
    { path: 'test', component: TestComponent },
];
