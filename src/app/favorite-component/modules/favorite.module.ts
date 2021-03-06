import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '@src/app/login/modules';
import { PokemonService } from '@src/app/pokemon-component/services';
import { SharedModule } from '@src/app/shared/modules';

import { FavoriteComponent } from '../components';
import { FavoriteService } from '../services';
import { FavoriteRoutingModule } from './favorite-routing.module';

@NgModule({
  declarations: [FavoriteComponent],
  entryComponents: [FavoriteComponent],
  imports: [CommonModule, FavoriteRoutingModule, SharedModule, LoginModule],
  providers: [FavoriteService, PokemonService],
})
export class FavoriteModule {}
