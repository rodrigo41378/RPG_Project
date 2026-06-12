import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TreasuresPage } from './treasures.page';
import { SharedModule } from '../shared/shared.module';
import { TreasuresPageRoutingModule } from './treasures-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreasuresPageRoutingModule,
    SharedModule,
  ],
  declarations: [TreasuresPage],
})
export class TreasuresPageModule {}
