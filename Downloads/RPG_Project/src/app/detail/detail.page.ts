import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { RpgDataService } from '../shared/services/rpg-data.service';
import { FavoritesService } from '../shared/services/favorites.service';

@Component({
  selector: 'app-detail',
  templateUrl: 'detail.page.html',
  styleUrls: ['detail.page.scss'],
  standalone: false,
})
export class DetailPage {
  private route    = inject(ActivatedRoute);
  private location = inject(Location);
  private navCtrl  = inject(NavController);
  private rpg      = inject(RpgDataService);
  private fav      = inject(FavoritesService);

  type?: string;
  id?: string;
  item: any = null;
  isFavorite = false;

  ionViewWillEnter() {
    const params = this.route.parent?.snapshot.paramMap ?? this.route.snapshot.paramMap;
    this.type = params.get('type') || undefined;
    this.id   = params.get('id')   || undefined;

    if (!this.type || !this.id) {
      this.type = this.route.snapshot.paramMap.get('type') || undefined;
      this.id   = this.route.snapshot.paramMap.get('id')   || undefined;
    }

    if (this.type && this.id) {
      this.loadItem();
      this.isFavorite = this.fav.isFavorite(this.type, this.id);
    }
  }

  loadItem() {
    switch (this.type) {
      case 'category': this.item = this.rpg.getCategoryById(this.id!);  break;
      case 'creature': this.item = this.rpg.getCreatureById(this.id!);  break;
      case 'treasure': this.item = this.rpg.getTreasureById(this.id!);  break;
      case 'region':   this.item = this.rpg.getRegionById(this.id!);    break;
      case 'deity':    this.item = this.rpg.getDeityById(this.id!);     break;
    }
  }

  back() { this.location.back(); }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  toggleFavorite() {
    if (!this.type || !this.id) return;
    this.isFavorite = this.fav.toggle(this.type, this.id, this.item?.name);
  }

  getIcon(): string {
    if (this.type === 'creature') return this.creatureIcon(this.id || '');
    if (this.type === 'treasure') return this.treasureIcon(this.id || '');
    if (this.type === 'region')   return this.regionIcon(this.item?.type || '');
    if (this.type === 'deity')    return this.deityIcon(this.id || '');
    if (this.type === 'category') return this.categoryIcon(this.item?.type || '');
    return 'menu_book';
  }

  private creatureIcon(id: string): string {
    const map: Record<string, string> = {
      'skeleton':     'skull',
      'wraith':       'dark_mode',
      'zombie':       'sentiment_very_dissatisfied',
      'lich':         'auto_fix_high',
      'dragon-black': 'mode_heat',
      'minotaur':     'sports_martial_arts',
      'banshee':      'record_voice_over',
      'golem-iron':   'precision_manufacturing',
      'vampire-lord': 'dark_mode',
      'werewolf':     'pets',
      'goblin-king':  'psychology',
      'troll-frost':  'ac_unit',
    };
    return map[id] || 'pest_control';
  }

  private treasureIcon(id: string): string {
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
    return map[id] || 'diamond';
  }

  private regionIcon(type: string): string {
    const map: Record<string, string> = {
      'Vulcânico': 'local_fire_department',
      'Místico':   'auto_fix_high',
      'Sombrio':   'dark_mode',
      'Urbano':    'location_city',
    };
    return map[type] || 'castle';
  }

  private deityIcon(id: string): string {
    const map: Record<string, string> = {
      'kael':     'hardware',
      'sylvara':  'forest',
      'morrigan': 'skull',
      'valdris':  'whatshot',
      'aethon':   'light_mode',
    };
    return map[id] || 'flare';
  }

  private categoryIcon(type: string): string {
    const map: Record<string, string> = {
      'criatura': 'pest_control',
      'classe':   'manage_accounts',
      'reino':    'castle',
      'arma':     'swords',
      'magia':    'auto_fix_high',
    };
    return map[type] || 'menu_book';
  }
}
