import { Component } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { StoreService } from './services/store.service';
import { ElectronService } from './services/electron.service';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  loader: boolean;

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
  }

  routerListener(): void {
    const routes:string[] = ["/", "/connexion", "accueil"];
    this.router.events.pipe(
      filter((event:any): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url))
      .subscribe({
        next: (data:string)=>{
         console.log(data)
        }
    });
  }
}
