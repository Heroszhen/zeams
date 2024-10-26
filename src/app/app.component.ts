import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StoreService } from './services/store.service';
import { ElectronService } from './services/electron.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zeams';

  constructor(
    private readonly electronService: ElectronService,
    private readonly storeService: StoreService
  ) {
    this.storeService.appEnv$.next([this.electronService.isElectron()])
  }
}
