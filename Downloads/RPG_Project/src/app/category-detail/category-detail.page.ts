import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { Category } from '../shared/models/rpg.models';
import { RpgDataService } from '../shared/services/rpg-data.service';
import { FavoritesService } from '../shared/services/favorites.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: 'category-detail.page.html',
  styleUrls: ['category-detail.page.scss'],
  standalone: false,
})
export class CategoryDetailPage {
  category?: Category;
  isFavorite = false;

  powers:  { icon: string; name: string; description: string }[] = [];
  legendaryFigures: { icon: string; name: string; lore: string }[] = [];
  lore = '';

  relatedTopics = [
    { name: 'Bestiário',     icon: 'menu_book', route: '/bestiary' },
    { name: 'Armas Mágicas', icon: 'swords',    route: '/treasures' },
    { name: 'Reinos',        icon: 'castle',    route: '/realms' },
  ];

  private route   = inject(ActivatedRoute);
  private location= inject(Location);
  private navCtrl = inject(NavController);
  private rpg     = inject(RpgDataService);
  private fav       = inject(FavoritesService);
  private sanitizer = inject(DomSanitizer);

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.category   = this.rpg.getCategoryById(id);
      this.isFavorite = this.fav.isFavorite('category', id);

      const detail = this.rpg.getCategoryDetail(id);
      if (detail) {
        this.lore             = detail.lore;
        this.powers           = detail.powers;
        this.legendaryFigures = detail.figures;
      } else {
        // fallback genérico se não houver detalhe específico
        this.lore = this.category?.description || '';
        this.powers = [
          { icon: 'bolt',       name: 'Poder Arcano',  description: 'Manipula forças primordiais do universo.' },
          { icon: 'shield',     name: 'Resistência',   description: 'Imune a doenças e venenos mundanos.' },
          { icon: 'visibility', name: 'Visão Sombria', description: 'Enxerga perfeitamente na escuridão total.' },
          { icon: 'psychology', name: 'Instinto',      description: 'Percebe perigos antes que se manifestem.' },
        ];
        this.legendaryFigures = [
          { icon: 'star', name: 'Figura Lendária',  lore: 'Um dos grandes nomes da história deste grupo.' },
          { icon: 'skull',name: 'O Sem-Nome',       lore: 'Identidade apagada da memória do mundo.' },
        ];
      }
    }
  }

  goBack()       { this.location.back(); }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).style.display = 'none';
  }
  navigateTo(r: string) { this.navCtrl.navigateRoot(r, { animated: false }); }

  toggleFavorite() {
    if (!this.category) return;
    this.isFavorite = this.fav.toggle('category', this.category.id, this.category.name);
  }

  heroSvg(): SafeHtml {
    const svgs: Record<string, string> = {
      'dragoes': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><ellipse cx="38" cy="50" rx="18" ry="11"/><ellipse cx="57" cy="40" rx="10" ry="8"/><ellipse cx="66" cy="41" rx="5" ry="4"/><circle cx="60" cy="37" r="2" fill="#000" opacity=".5"/><polygon points="58,33 56,24 62,30"/><path d="M30,46 C18,30 10,24 14,18 C18,28 26,34 32,40Z"/><path d="M36,44 C28,32 22,26 24,18 C30,26 36,34 38,42Z"/><path d="M20,54 C14,56 8,58 6,64 C10,60 16,58 22,58Z"/><line x1="34" y1="60" x2="30" y2="68" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="38" y1="61" x2="36" y2="70" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><line x1="42" y1="60" x2="41" y2="69" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>`,
      'elfos': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><rect x="30" y="42" width="20" height="24" rx="4"/><circle cx="40" cy="32" r="12"/><polygon points="28,28 22,20 30,32"/><polygon points="52,28 58,20 50,32"/><path d="M32,22 L36,14 L40,20 L44,14 L48,22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="36" cy="32" r="1.5" fill="#000" opacity=".4"/><circle cx="44" cy="32" r="1.5" fill="#000" opacity=".4"/><line x1="30" y1="48" x2="20" y2="58" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="48" x2="60" y2="58" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
      'orcs': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><rect x="22" y="42" width="36" height="26" rx="6"/><rect x="24" y="18" width="32" height="28" rx="8"/><rect x="33" y="44" width="4" height="7" rx="2"/><rect x="43" y="44" width="4" height="7" rx="2"/><rect x="26" y="24" width="10" height="3" rx="1.5"/><rect x="44" y="24" width="10" height="3" rx="1.5"/><circle cx="33" cy="31" r="3" fill="#000" opacity=".4"/><circle cx="47" cy="31" r="3" fill="#000" opacity=".4"/><ellipse cx="14" cy="52" rx="7" ry="10"/><ellipse cx="66" cy="52" rx="7" ry="10"/></svg>`,
      'fadas': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><path d="M38,38 C28,28 12,24 10,32 C14,36 26,38 36,40Z" opacity=".7"/><path d="M42,38 C52,28 68,24 70,32 C66,36 54,38 44,40Z" opacity=".7"/><path d="M38,42 C30,44 16,50 18,58 C24,54 34,46 38,44Z" opacity=".5"/><path d="M42,42 C50,44 64,50 62,58 C56,54 46,46 42,44Z" opacity=".5"/><ellipse cx="40" cy="48" rx="7" ry="10"/><circle cx="40" cy="32" r="9"/><line x1="54" y1="26" x2="66" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="66" cy="14" r="4"/><circle cx="72" cy="20" r="2"/><circle cx="68" cy="8" r="1.5"/></svg>`,
      'vampiros': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><path d="M38,44 C28,46 12,54 10,72 L38,72Z"/><path d="M42,44 C52,46 68,54 70,72 L42,72Z"/><rect x="30" y="42" width="20" height="20" rx="4"/><circle cx="40" cy="30" r="12"/><path d="M28,44 L20,36 L32,42Z"/><path d="M52,44 L60,36 L48,42Z"/><rect x="36" y="40" width="3" height="5" rx="1.5"/><rect x="41" y="40" width="3" height="5" rx="1.5"/><circle cx="36" cy="29" r="2.5" fill="#000" opacity=".4"/><circle cx="44" cy="29" r="2.5" fill="#000" opacity=".4"/><path d="M28,26 C30,16 36,12 40,12 C44,12 50,16 52,26" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`,
      'lobisomens': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><rect x="26" y="42" width="28" height="26" rx="6"/><ellipse cx="40" cy="32" rx="14" ry="12"/><ellipse cx="40" cy="40" rx="8" ry="6"/><polygon points="30,22 26,10 36,20"/><polygon points="50,22 54,10 44,20"/><circle cx="35" cy="30" r="2.5" fill="#000" opacity=".4"/><circle cx="45" cy="30" r="2.5" fill="#000" opacity=".4"/><ellipse cx="40" cy="38" rx="3" ry="2" fill="#000" opacity=".3"/><line x1="26" y1="66" x2="22" y2="74" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="30" y1="67" x2="28" y2="76" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="67" x2="52" y2="76" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="54" y1="66" x2="58" y2="74" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`,
      'trolls': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><rect x="18" y="40" width="44" height="30" rx="8"/><ellipse cx="40" cy="28" rx="18" ry="16"/><ellipse cx="40" cy="32" rx="6" ry="5"/><path d="M24,22 Q40,16 56,22" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="34" cy="26" r="2.5" fill="#000" opacity=".4"/><circle cx="46" cy="26" r="2.5" fill="#000" opacity=".4"/><circle cx="68" cy="52" r="8"/><line x1="62" y1="52" x2="58" y2="52" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><line x1="18" y1="48" x2="10" y2="62" stroke="currentColor" stroke-width="6" stroke-linecap="round"/></svg>`,
      'ogros': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><rect x="16" y="38" width="48" height="32" rx="10"/><ellipse cx="40" cy="26" rx="20" ry="18"/><ellipse cx="18" cy="26" rx="6" ry="9"/><ellipse cx="62" cy="26" rx="6" ry="9"/><rect x="22" y="20" width="36" height="4" rx="2"/><circle cx="33" cy="27" r="3" fill="#000" opacity=".4"/><circle cx="47" cy="27" r="3" fill="#000" opacity=".4"/><path d="M32,36 Q40,42 48,36" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="8" cy="52" rx="8" ry="12"/><ellipse cx="72" cy="52" rx="8" ry="12"/></svg>`,
      'goblins': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><rect x="28" y="46" width="24" height="22" rx="5"/><ellipse cx="40" cy="34" rx="16" ry="14"/><polygon points="24,30 14,22 26,38"/><polygon points="56,30 66,22 54,38"/><circle cx="35" cy="32" r="5" fill="#000" opacity=".35"/><circle cx="45" cy="32" r="5" fill="#000" opacity=".35"/><circle cx="35" cy="32" r="2.5"/><circle cx="45" cy="32" r="2.5"/><ellipse cx="40" cy="38" rx="3" ry="2"/><path d="M33,42 Q40,48 47,42" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
      'necromantes': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><path d="M24,44 L16,76 L64,76 L56,44 Q50,50 40,50 Q30,50 24,44Z"/><rect x="30" y="40" width="20" height="12" rx="4"/><circle cx="40" cy="28" r="12"/><path d="M28,20 Q40,12 52,20 L52,36 Q46,40 40,40 Q34,40 28,36Z"/><circle cx="36" cy="28" r="2.5" fill="#000" opacity=".5"/><circle cx="44" cy="28" r="2.5" fill="#000" opacity=".5"/><line x1="62" y1="20" x2="62" y2="68" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="62" cy="16" r="6"/><circle cx="60" cy="14" r="1.5" fill="#000" opacity=".4"/><circle cx="64" cy="14" r="1.5" fill="#000" opacity=".4"/></svg>`,
      'magos': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><path d="M26,44 L18,76 L62,76 L54,44 Q48,50 40,50 Q32,50 26,44Z"/><rect x="30" y="40" width="20" height="12" rx="4"/><circle cx="40" cy="28" r="10"/><polygon points="40,4 28,30 52,30"/><rect x="25" y="29" width="30" height="4" rx="2"/><path d="M34,36 Q40,48 46,36" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="62" y1="22" x2="62" y2="70" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><polygon points="62,10 64,16 70,16 65,20 67,26 62,22 57,26 59,20 54,16 60,16"/></svg>`,
      'reinos': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><rect x="30" y="24" width="20" height="46"/><rect x="30" y="18" width="5" height="8"/><rect x="37" y="18" width="5" height="8"/><rect x="44" y="18" width="5" height="8"/><rect x="10" y="36" width="16" height="34"/><rect x="10" y="30" width="4" height="8"/><rect x="17" y="30" width="4" height="8"/><rect x="54" y="36" width="16" height="34"/><rect x="54" y="30" width="4" height="8"/><rect x="61" y="30" width="4" height="8"/><path d="M35,70 L35,56 Q40,50 45,56 L45,70Z" fill="#000" opacity=".3"/><rect x="37" y="36" width="6" height="8" rx="3" fill="#000" opacity=".3"/><line x1="40" y1="4" x2="40" y2="18" stroke="currentColor" stroke-width="2"/><polygon points="40,4 52,8 40,12"/></svg>`,
      'classes': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><path d="M40,8 L64,20 L64,44 Q64,62 40,72 Q16,62 16,44 L16,20Z"/><path d="M40,16 L58,26 L58,44 Q58,58 40,66 Q22,58 22,44 L22,26Z" fill="#000" opacity=".2"/><rect x="37" y="24" width="6" height="28" rx="2" fill="#000" opacity=".3"/><rect x="26" y="35" width="28" height="6" rx="2" fill="#000" opacity=".3"/></svg>`,
      'armas': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><polygon points="40,4 44,26 40,30 36,26"/><rect x="26" y="28" width="28" height="7" rx="3"/><rect x="37" y="35" width="6" height="20" rx="3"/><circle cx="40" cy="58" r="6"/><circle cx="16" cy="14" r="3"/><circle cx="64" cy="14" r="3"/><circle cx="12" cy="28" r="2"/><circle cx="68" cy="28" r="2"/><circle cx="20" cy="8" r="1.5"/><circle cx="60" cy="8" r="1.5"/></svg>`,
      'mitologias': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="currentColor"><circle cx="40" cy="36" r="14"/><line x1="40" y1="6" x2="40" y2="16" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="40" y1="56" x2="40" y2="66" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="10" y1="36" x2="20" y2="36" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="60" y1="36" x2="70" y2="36" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="19" y1="15" x2="26" y2="22" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="54" y1="50" x2="61" y2="57" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="61" y1="15" x2="54" y2="22" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><line x1="26" y1="50" x2="19" y2="57" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="40" cy="36" r="5" fill="#000" opacity=".3"/><circle cx="40" cy="36" r="2.5"/><path d="M8,72 L20,56 L32,68 L44,50 L56,66 L68,52 L76,72Z" opacity=".5"/></svg>`,
    };
    const svg = svgs[this.category?.id || ''] || '';
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

}
