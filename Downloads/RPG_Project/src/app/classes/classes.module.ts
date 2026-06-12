import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ClassesPage } from './classes.page';
import { SharedModule } from '../shared/shared.module';
import { ClassesPageRoutingModule } from './classes-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ClassesPageRoutingModule, SharedModule],
  declarations: [ClassesPage],
})
export class ClassesPageModule {}
