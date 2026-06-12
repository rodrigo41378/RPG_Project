import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',         loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'category/:id', loadChildren: () => import('./category-detail/category-detail.module').then(m => m.CategoryDetailPageModule) },
  { path: 'bestiary',     loadChildren: () => import('./bestiary/bestiary.module').then(m => m.BestiaryPageModule) },
  { path: 'treasures',    loadChildren: () => import('./treasures/treasures.module').then(m => m.TreasuresPageModule) },
  { path: 'realms',       loadChildren: () => import('./realms/realms.module').then(m => m.RealmsPageModule) },
  { path: 'classes',      loadChildren: () => import('./classes/classes.module').then(m => m.ClassesPageModule) },
  { path: 'favorites',    loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesPageModule) },
  { path: 'profile',      loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule) },
  { path: 'profile/character', loadChildren: () => import('./perfil/character/character.module').then(m => m.CharacterPageModule) },
  { path: 'profile/notes',     loadChildren: () => import('./perfil/notes/notes.module').then(m => m.NotesPageModule) },
  { path: 'profile/about',     loadChildren: () => import('./perfil/about/about.module').then(m => m.AboutPageModule) },
  // Rota de detalhe com params DIRETO no app-routing — assim o Angular
  // reconstrói o componente toda vez que :type ou :id mudar
  { path: 'detail/:type/:id', loadChildren: () => import('./detail/detail.module').then(m => m.DetailPageModule) },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
