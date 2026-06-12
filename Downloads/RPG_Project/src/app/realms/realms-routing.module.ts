import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealmsPage } from './realms.page';

const routes: Routes = [
  {
    path: '',
    component: RealmsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RealmsPageRoutingModule {}
