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
  { path: 'no-auth', component: NoAuthComponent },
  { path: '**', redirectTo: '/not-found' },
  { path: 'not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
