import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoAuthComponent, NotFoundComponent } from './alternative/components';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/modules/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'pokemon-list',
    loadChildren: () =>
      import('./pokemon-component/modules/pokemon.module').then(
        (m) => m.PokemonModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile-component/modules/profile.module').then(
        (m) => m.ProfileModule
      ),
  },
  {
    path: 'favorite',
    loadChildren: () =>
      import('./favorite-component/modules/favorite.module').then(
        (m) => m.FavoriteModule
      ),
  },
  { path: 'no-auth', component: NoAuthComponent },
  { path: '**', redirectTo: '/not-found' },
  { path: 'not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
