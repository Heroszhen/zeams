import { Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { authGuardGuard } from './services/auth-guard.guard';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HistoryComponent } from './components/history/history.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'connexion', component: LoginComponent },
    { path: 'accueil', component: HomeComponent, canActivate: [authGuardGuard] },
    { path: 'chat', component: ChatComponent, canActivate: [authGuardGuard] },
    { path: 'calendrier', component: CalendarComponent, canActivate: [authGuardGuard] },
    { path: 'historique-appels', component: HistoryComponent, canActivate: [authGuardGuard] },
    { path: 'test', component: TestComponent },
];
