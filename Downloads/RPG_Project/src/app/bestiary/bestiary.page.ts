import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { RpgDataService } from '../shared/services/rpg-data.service';
import { BestiaryCreature } from '../shared/models/rpg.models';

@Component({
  selector: 'app-bestiary',
  templateUrl: 'bestiary.page.html',
  styleUrls: ['bestiary.page.scss'],
  standalone: false,
})
export class BestiaryPage {
  creatures: BestiaryCreature[] = [];
  filteredCreatures: BestiaryCreature[] = [];
  levels = ['todos', 'comum', 'incomum', 'raro', 'épico', 'lendário'];
  selectedLevel = 'todos';
  searchTerm = '';
  showSearch = false;

  private location = inject(Location);
  private navCtrl  = inject(NavController);
  private rpg      = inject(RpgDataService);

  ionViewWillEnter() {
    this.creatures = this.rpg.getBestiaryCreatures();
    this.filter();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) { this.searchTerm = ''; this.filter(); }
  }

  selectLevel(level: string) { this.selectedLevel = level; this.filter(); }
  filterCreatures() { this.filter(); }

  filter() {
    let list = [...this.creatures];
    if (this.selectedLevel !== 'todos')
      list = list.filter(c => c.level === this.selectedLevel);
    if (this.searchTerm.trim())
      list = list.filter(c =>
        c.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    this.filteredCreatures = list;
  }

  openCreature(c: BestiaryCreature) {
    this.navCtrl.navigateRoot(['/detail', 'creature', c.id]);
  }

  back() { this.location.back(); }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  creatureIcon(c: BestiaryCreature): string {
    const map: Record<string, string> = {
      'skeleton':     'skull',
      'wraith':       'dark_mode',
      'zombie':       'sick',
      'lich':         'auto_fix_high',
      'dragon-black': 'mode_heat',
      'minotaur':     'sports_martial_arts',
      'banshee':      'record_voice_over',
      'golem-iron':   'precision_manufacturing',
      'vampire-lord': 'nightlight',
      'werewolf':     'pets',
      'goblin-king':  'psychology',
      'troll-frost':  'ac_unit',
    };
    return map[c.id] || 'pest_control';
  }
}
