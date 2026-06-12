import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

interface RpgClass {
  id: string; name: string; icon: string; tagline: string;
  colorKey: string; attributes: string[]; imageUrl?: string;
}

@Component({
  selector: 'app-classes',
  templateUrl: 'classes.page.html',
  styleUrls: ['classes.page.scss'],
  standalone: false,
})
export class ClassesPage {
  classes: RpgClass[] = [
    { id: 'guerreiro',  name: 'Guerreiro',  icon: 'shield',          tagline: 'Mestre do combate corpo a corpo.',    colorKey: 'red',    attributes: ['Força','Resistência'],     imageUrl: 'assets/images/rpg/classe_guerreiro.jpg' },
    { id: 'mago',       name: 'Mago',        icon: 'auto_fix_high',   tagline: 'Dobra a realidade com magia arcana.', colorKey: 'blue',   attributes: ['Inteligência','Arcano'],    imageUrl: 'assets/images/rpg/classe_mago.jpg' },
    { id: 'ladino',     name: 'Ladino',      icon: 'gavel',           tagline: 'Sombras são sua armadura.',           colorKey: 'purple', attributes: ['Agilidade','Furtividade'],  imageUrl: 'assets/images/rpg/classe_ladino.jpg' },
    { id: 'clerigo',    name: 'Clérigo',     icon: 'church',          tagline: 'Porta-voz dos deuses no mundo.',      colorKey: 'amber',  attributes: ['Sabedoria','Cura'],         imageUrl: 'assets/images/rpg/classe_clerigo.jpg' },
    { id: 'ranger',     name: 'Ranger',      icon: 'forest',          tagline: 'Caçador das terras selvagens.',       colorKey: 'green',  attributes: ['Percepção','Rastreio'],     imageUrl: 'assets/images/rpg/classe_ranger.jpg' },
    { id: 'bardo',      name: 'Bardo',       icon: 'music_note',      tagline: 'Magia através da arte e da música.',  colorKey: 'purple', attributes: ['Carisma','Magia'],          imageUrl: 'assets/images/rpg/classe_bardo.jpg' },
    { id: 'necromante', name: 'Necromante',  icon: 'skull',           tagline: 'Senhor dos mortos e das sombras.',    colorKey: 'teal',   attributes: ['Morte','Necromancia'],      imageUrl: 'assets/images/rpg/classe_necromante.jpg' },
    { id: 'paladino',   name: 'Paladino',    icon: 'star',            tagline: 'Guerreiro sagrado da ordem divina.',  colorKey: 'amber',  attributes: ['Honra','Divino'],           imageUrl: 'assets/images/rpg/classe_paladino.jpg' },
  ];

  private location = inject(Location);
  private navCtrl  = inject(NavController);

  back() { this.location.back(); }
  selectClass(cls: RpgClass) { this.navCtrl.navigateRoot(['/category', cls.id]); }
}
