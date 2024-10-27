import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { StoreService } from './services/store.service';
import { ElectronService } from './services/electron.service';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { LeftNavComponent } from './components/left-nav/left-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeftNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  loader: boolean;
  currentRoute: string = "";
  routes:string[] = ["/", "/connexion", "/accueil"];

  constructor(
    private readonly electronService: ElectronService,
    private readonly storeService: StoreService,
    private readonly router: Router
  ) {
    this.storeService.appEnv$.next([this.electronService.isElectron()]);
    this.storeService.loader$.subscribe((data:boolean[])=> {
      this.loader = data[0];
    });
    this.routerListener();

    this.router.navigate(["/accueil"]);
  }

  routerListener(): void {
    this.router.events.pipe(
      filter((event:any): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url))
      .subscribe({
        next: (data:string)=>{
          this.currentRoute = data;
        }
    });
  }
}
