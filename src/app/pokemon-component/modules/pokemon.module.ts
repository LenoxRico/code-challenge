import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '@src/app/login/modules';
import { SharedModule } from '@src/app/shared/modules';

import { PokemonListComponent } from '../components';
import { PokemonModalComponent } from '../components/pokemon-modal';
import { PokemonService } from '../services';
import { PokemonRoutingModule } from './pokemon-routing.module';

@NgModule({
  declarations: [PokemonListComponent, PokemonModalComponent],
  entryComponents: [PokemonListComponent, PokemonModalComponent],
  imports: [CommonModule, PokemonRoutingModule, SharedModule, LoginModule],
  providers: [PokemonService],
})
export class PokemonModule {}
