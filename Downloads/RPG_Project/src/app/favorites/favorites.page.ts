import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { FavoritesService, FavoriteItem } from '../shared/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss'],
  standalone: false
})
export class FavoritesPage {
  private fav      = inject(FavoritesService);
  private location = inject(Location);
  private navCtrl  = inject(NavController);
  items: FavoriteItem[] = [];

  ionViewWillEnter() { this.items = this.fav.getAll(); }

  back()                     { this.location.back(); }
  open(item: FavoriteItem)   { this.navCtrl.navigateRoot(['/detail', item.type, item.id]); }
  remove(item: FavoriteItem) { this.fav.remove(item.type, item.id); this.items = this.fav.getAll(); }
  clearAll()                 { this.items.forEach(i => this.fav.remove(i.type, i.id)); this.items = []; }

  typeIcon(type: string): string {
    const m: Record<string, string> = {
      creature: 'pest_control', treasure: 'diamond',
      region: 'castle', deity: 'flare', category: 'menu_book',
    };
    return m[type] || 'bookmark';
  }
}
