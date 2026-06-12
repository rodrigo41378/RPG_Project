import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
  standalone: false,
})
export class PerfilPage {
  private navCtrl = inject(NavController);
  private location = inject(Location);

  level = 1;
  xp = 120;
  xpMax = 300;

  actions = [
    { id: 'favorites', icon: 'bookmarks',  label: 'Meus Favoritos' },
    { id: 'character', icon: 'person_add', label: 'Criar Personagem' },
    { id: 'notes',     icon: 'edit_note',  label: 'Minhas Anotações' },
    { id: 'about',     icon: 'info',       label: 'Sobre o Manual Épico' },
  ];

  stats = [
    { label: 'Força',     value: 3, icon: 'fitness_center' },
    { label: 'Sabedoria', value: 2, icon: 'psychology' },
    { label: 'Agilidade', value: 4, icon: 'sprint' },
  ];

  get xpPercent() { return (this.xp / this.xpMax) * 100; }

  doAction(action: any) {
    const routes: Record<string, string> = {
      favorites: '/favorites',
      character: '/profile/character',
      notes:     '/profile/notes',
      about:     '/profile/about',
    };
    this.navCtrl.navigateRoot(routes[action.id] || '/profile');
  }

  goBack() { this.location.back(); }
  openAbout() { this.navCtrl.navigateRoot('/profile/about'); }
}
