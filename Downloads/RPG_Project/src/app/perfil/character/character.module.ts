import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CharacterPage } from './character.page';
import { CharacterPageRoutingModule } from './character-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CharacterPageRoutingModule],
  declarations: [CharacterPage],
})
export class CharacterPageModule {}
