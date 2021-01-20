import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../login/guards/auth.guard';
import { PokemonListComponent } from '../components';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: PokemonListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonRoutingModule {}
