import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPage } from './detail.page';

// Params vêm do app-routing (detail/:type/:id)
// O path filho é vazio — o componente recebe os params via ActivatedRoute
const routes: Routes = [
  { path: '', component: DetailPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPageRoutingModule {}
