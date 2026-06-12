import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  standalone: false,
})
export class BottomNavComponent {
  private router = inject(Router);
  private navCtrl = inject(NavController);

  navigate(path: string) {
    this.navCtrl.navigateRoot(path, { animated: false });
  }

  isActive(path: string): boolean {
    if (path === '/home') return this.router.url === '/home' || this.router.url === '/';
    return this.router.url.startsWith(path);
  }
}
