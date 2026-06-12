import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DetailPage } from './detail.page';
import { DetailPageRoutingModule } from './detail-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, DetailPageRoutingModule, SharedModule],
  declarations: [DetailPage],
})
export class DetailPageModule {}
