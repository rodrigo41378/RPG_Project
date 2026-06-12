import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BestiaryPage } from './bestiary.page';
import { SharedModule } from '../shared/shared.module';
import { BestiaryPageRoutingModule } from './bestiary-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BestiaryPageRoutingModule,
    SharedModule,
  ],
  declarations: [BestiaryPage],
})
export class BestiaryPageModule {}
