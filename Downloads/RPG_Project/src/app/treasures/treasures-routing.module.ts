import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreasuresPage } from './treasures.page';

const routes: Routes = [
  {
    path: '',
    component: TreasuresPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreasuresPageRoutingModule {}
