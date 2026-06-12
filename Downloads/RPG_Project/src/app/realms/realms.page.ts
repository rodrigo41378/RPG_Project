import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { Region, Deity } from '../shared/models/rpg.models';
import { RpgDataService } from '../shared/services/rpg-data.service';

@Component({
  selector: 'app-realms',
  templateUrl: 'realms.page.html',
  styleUrls: ['realms.page.scss'],
  standalone: false,
})
export class RealmsPage {
  regions: Region[] = [];
  filteredRegions: Region[] = [];
  deities: Deity[] = [];
  searchTerm = '';
  showSearch = false;

  private location = inject(Location);
  private navCtrl  = inject(NavController);
  private rpgData  = inject(RpgDataService);

  ionViewWillEnter() {
    this.regions = this.rpgData.getRegions();
    this.filteredRegions = [...this.regions];
    this.deities = this.rpgData.getDeities();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) { this.searchTerm = ''; this.filterRegions(); }
  }

  filterRegions() {
    const s = this.searchTerm.toLowerCase();
    this.filteredRegions = this.regions.filter(r =>
      !s || r.name.toLowerCase().includes(s) || r.type.toLowerCase().includes(s)
    );
  }

  goBack()              { this.location.back(); }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }
  openRegion(r: Region) { this.navCtrl.navigateRoot(['/detail', 'region', r.id]); }
  openDeity(d: Deity)   { this.navCtrl.navigateRoot(['/detail', 'deity',  d.id]); }

  regionIcon(type: string): string {
    const map: Record<string, string> = {
      'Vulcânico': 'local_fire_department',
      'Místico':   'auto_fix_high',
      'Sombrio':   'dark_mode',
      'Urbano':    'location_city',
    };
    return map[type] || 'castle';
  }

  deityIcon(id: string): string {
    const map: Record<string, string> = {
      'kael':     'hardware',
      'sylvara':  'forest',
      'morrigan': 'skull',
      'valdris':  'whatshot',
      'aethon':   'light_mode',
    };
    return map[id] || 'flare';
  }
}
