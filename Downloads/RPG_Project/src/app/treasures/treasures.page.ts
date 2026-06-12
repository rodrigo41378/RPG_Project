import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { Treasure } from '../shared/models/rpg.models';
import { RpgDataService } from '../shared/services/rpg-data.service';

@Component({
  selector: 'app-treasures',
  templateUrl: 'treasures.page.html',
  styleUrls: ['treasures.page.scss'],
  standalone: false,
})
export class TreasuresPage {
  treasures: Treasure[] = [];
  filteredTreasures: Treasure[] = [];
  featuredTreasure?: Treasure;
  searchTerm = '';
  showFilter = false;
  selectedRarity = 'todos';
  rarities = ['todos', 'comum', 'incomum', 'raro', 'épico', 'lendário'];

  private location = inject(Location);
  private navCtrl  = inject(NavController);
  private rpg      = inject(RpgDataService);

  ionViewWillEnter() {
    this.treasures = this.rpg.getTreasures();
    this.featuredTreasure = this.treasures.find(t => t.rarity === 'lendário') || this.treasures[0];
    this.filteredTreasures = [...this.treasures];
  }

  toggleFilter() { this.showFilter = !this.showFilter; }
  selectRarity(r: string) { this.selectedRarity = r; this.filter(); }
  filterTreasures() { this.filter(); }

  filter() {
    let list = [...this.treasures];
    if (this.selectedRarity !== 'todos') list = list.filter(t => t.rarity === this.selectedRarity);
    if (this.searchTerm.trim()) list = list.filter(t =>
      t.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.filteredTreasures = list;
  }

  openTreasure(t: Treasure) { this.navCtrl.navigateRoot(['/detail', 'treasure', t.id]); }
  back()                     { this.location.back(); }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  treasureIcon(t: Treasure): string {
    const map: Record<string, string> = {
      'dawn-blade':       'swords',
      'amuleto-protecao': 'shield',
      'staff-arcane':     'auto_fix_high',
      'ring-shadows':     'trip_origin',
      'boots-speed':      'sprint',
      'grimoire-lich':    'menu_book',
      'crown-ancients':   'workspace_premium',
      'shield-titan':     'shield',
      'bow-starfall':     'arrows_outward',
      'potion-dragon':    'science',
    };
    return map[t.id] || 'diamond';
  }
}
