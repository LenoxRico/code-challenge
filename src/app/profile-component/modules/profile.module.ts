import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '@src/app/login/modules';
import { PokemonService } from '@src/app/pokemon-component/services';
import { SharedModule } from '@src/app/shared/modules';

import { ProfileComponent } from '../components';
import { ProfileService } from '../services';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [ProfileComponent],
  entryComponents: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, SharedModule, LoginModule],
  providers: [ProfileService, PokemonService],
})
export class ProfileModule {}
