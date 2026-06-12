import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CategoryDetailPage } from './category-detail.page';
import { SharedModule } from '../shared/shared.module';
import { CategoryDetailPageRoutingModule } from './category-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CategoryDetailPageRoutingModule,
    SharedModule,
  ],
  declarations: [CategoryDetailPage],
})
export class CategoryDetailPageModule {}
