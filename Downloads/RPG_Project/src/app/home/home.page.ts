import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { Category } from '../shared/models/rpg.models';
import { RpgDataService } from '../shared/services/rpg-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  @ViewChild('categoriesSection') categoriesSection!: ElementRef;
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchTerm = '';
  showSearch = false;

  private navCtrl    = inject(NavController);
  private sanitizer  = inject(DomSanitizer);
  private rpgData = inject(RpgDataService);

  ionViewWillEnter() {
    this.categories = this.rpgData.getCategories();
    this.filteredCategories = [...this.categories];
  }

  filterCategories() {
    const s = this.searchTerm.toLowerCase();
    this.filteredCategories = this.categories.filter(c =>
      !s || c.name.toLowerCase().includes(s) || c.description.toLowerCase().includes(s)
    );
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) { this.searchTerm = ''; this.filterCategories(); }
  }

  openCategory(cat: Category) {
    this.navCtrl.navigateRoot(['/category', cat.id]);
  }

  scrollToCategories() {
    this.categoriesSection?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  getCategoryIcon(cat: Category): string {
    const byId: Record<string, string> = {
      'dragoes':    'mode_heat',
      'elfos':      'forest',
      'orcs':       'fitness_center',
      'fadas':      'star',
      'vampiros':   'dark_mode',
      'lobisomens': 'pets',
      'trolls':     'healing',
      'ogros':      'sports_martial_arts',
      'goblins':    'psychology',
      'necromantes':'skull',
      'magos':      'auto_fix_high',
      'reinos':     'castle',
      'classes':    'manage_accounts',
      'armas':      'swords',
      'mitologias': 'flare',
      'guerreiro':  'shield',
      'mago':       'bolt',
      'ladino':     'visibility_off',
      'clerigo':    'light_mode',
      'ranger':     'forest',
      'bardo':      'music_note',
      'necromante': 'skull',
      'paladino':   'military_tech',
    };
    const byType: Record<string, string> = {
      criatura: 'pest_control', classe: 'manage_accounts',
      reino: 'castle', arma: 'swords', magia: 'auto_fix_high',
    };
    return byId[cat.id] || byType[cat.type] || 'category';
  }

  getTypeIcon(type: string): string {
    const m: Record<string, string> = {
      criatura: 'pest_control', classe: 'manage_accounts',
      reino: 'castle', arma: 'swords', magia: 'auto_fix_high',
    };
    return m[type] || 'category';
  }

  getCategorySvg(cat: Category): SafeHtml {
    const unicodeMap: Record<string, string> = {
      'dragoes': '<span class="cat-unicode-icon" aria-label="Dragão" style="font-size:66px">𓆙</span>',
      'elfos': '<span class="cat-unicode-icon" aria-label="Elfo" style="font-size:66px">ᛟ</span>',
      'orcs': '<span class="cat-unicode-icon" aria-label="Orc" style="font-size:52px">☠</span>',
      'fadas': '<span class="cat-unicode-icon" aria-label="Fada" style="font-size:52px">✦</span>',
      'vampiros': '<span class="cat-unicode-icon" aria-label="Vampiro" style="font-size:52px">🩸</span>',
      'lobisomens': '<span class="cat-unicode-icon" aria-label="Lobisomem" style="font-size:58px">☽</span>',
      'trolls': '<span class="cat-unicode-icon" aria-label="Troll" style="font-size:52px">⚒</span>',
      'ogros': '<span class="cat-unicode-icon" aria-label="Ogro" style="font-size:52px">⚡</span>',
      'goblins': '<span class="cat-unicode-icon" aria-label="Goblin" style="font-size:52px">⚗</span>',
      'necromantes': '<span class="cat-unicode-icon" aria-label="Necromantes" style="font-size:58px">†</span>',
      'magos': '<span class="cat-unicode-icon" aria-label="Magos" style="font-size:52px">⛧</span>',
      'reinos': '<span class="cat-unicode-icon" aria-label="Reinos" style="font-size:52px">♜</span>',
      'classes': '<span class="cat-unicode-icon" aria-label="Classes RPG" style="font-size:52px">⚜</span>',
      'armas': '<span class="cat-unicode-icon" aria-label="Armas" style="font-size:52px">⚔</span>',
      'mitologias': '<span class="cat-unicode-icon" aria-label="Mitologias" style="font-size:52px">⸸</span>',
      'guerreiro': '<span class="cat-unicode-icon" aria-label="Guerreiro" style="font-size:52px">⚔</span>',
      'mago': '<span class="cat-unicode-icon" aria-label="Mago" style="font-size:52px">⛧</span>',
      'ladino': '<span class="cat-unicode-icon" aria-label="Ladino" style="font-size:58px">†</span>',
      'clerigo': '<span class="cat-unicode-icon" aria-label="Clérigo" style="font-size:58px">✝</span>',
      'ranger': '<span class="cat-unicode-icon" aria-label="Ranger" style="font-size:68px">⌖</span>',
      'bardo': '<span class="cat-unicode-icon" aria-label="Bardo" style="font-size:60px">♩</span>',
      'necromante': '<span class="cat-unicode-icon" aria-label="Necromante" style="font-size:52px">☠</span>',
      'paladino': '<span class="cat-unicode-icon" aria-label="Paladino" style="font-size:58px">✙</span>',
    };
    const html = unicodeMap[cat.id] || '<span class="cat-unicode-icon" style="font-size:52px">☠</span>';
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
