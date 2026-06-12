import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NotesPage } from './notes.page';
import { NotesPageRoutingModule } from './notes-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NotesPageRoutingModule],
  declarations: [NotesPage],
})
export class NotesPageModule {}
