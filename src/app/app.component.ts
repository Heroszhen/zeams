import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { StoreService } from './services/store.service';
import { ElectronService } from './services/electron.service';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { Profile } from './models/profile';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { ApiService } from './services/api.service';
import { readFile } from './services/utils.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeftNavComponent, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  loader: boolean;
  currentRoute: string = "";
  routes:string[] = ["/", "/connexion", "/accueil"];
  form:number|null = null
  profileM = new Profile();
  file:File|null = null;
  fileUrl:string = "";

  constructor(
    private readonly electronService: ElectronService,
    private readonly storeService: StoreService,
    private readonly apiService: ApiService,
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

  toggleModal(formType:number|null = null) {
    if (formType === 1) {
      this.profileM = new Profile();
      this.profileM.assignData(this.storeService.profile$.getValue()[0]);
    }

    if (formType === 2) {
      this.file = null;
      this.fileUrl = "";
    }

    this.form = formType;
  }

  sendName() {
    this.apiService.patchEditProfile(this.profileM).subscribe({
      next: (data)=>{
        this.storeService.profile$.next([data.data]);
      },
    });
  }

  async handleProfilePhoto(event:DragEvent | Event) {
    event.preventDefault();
    let file: File|null = null;
    if (event instanceof DragEvent) {
      file = event.dataTransfer?.files.item(0);
    } else {
      file = (event.target as HTMLInputElement)?.files.item(0);
    }
    if (file !== null && file.type.includes('image')) {
      this.file = file;
      this.fileUrl = await readFile(file);
    }
  }

  sendProfilePhoto() {
    let formData = new FormData();
    formData.append('file', this.file);
    this.apiService.postEditProfilePhoto(formData).subscribe({
      next: (data)=>{
        this.storeService.profile$.next([data.data]);
      },
    });
  }
}
