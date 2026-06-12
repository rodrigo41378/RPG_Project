import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PerfilPage } from './perfil.page';
import { SharedModule } from '../shared/shared.module';
import { PerfilPageRoutingModule } from './perfil-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PerfilPageRoutingModule, SharedModule],
  declarations: [PerfilPage],
})
export class PerfilPageModule {}
