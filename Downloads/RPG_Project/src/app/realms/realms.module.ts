import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RealmsPage } from './realms.page';
import { SharedModule } from '../shared/shared.module';
import { RealmsPageRoutingModule } from './realms-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RealmsPageRoutingModule, SharedModule],
  declarations: [RealmsPage],
})
export class RealmsPageModule {}
