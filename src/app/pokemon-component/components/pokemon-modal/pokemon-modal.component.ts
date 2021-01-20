import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '@src/app/shared/services';

import { ModalData, Pokemon } from '../../interfaces';
import { PokemonService } from '../../services';

@Component({
  selector: 'app-pokemon-modal',
  templateUrl: './pokemon-modal.component.html',
  styleUrls: ['./pokemon-modal.component.scss'],
})
export class PokemonModalComponent implements OnInit {
  pokemonUrl: Pokemon;
  pokemon: Pokemon;
  pokemonLocation: any;

  constructor(
    public dialogRef: MatDialogRef<PokemonModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: ModalData,
    private _coreServices: CoreService,
    private _pokemonService: PokemonService
  ) {
    this.pokemonUrl = this.data.pokemon;
  }

  ngOnInit(): void {
    if (this.pokemonUrl.url) {
      this.getPokemonDetail(this.pokemonUrl.url);
    } else {
      this.cancel();
    }
  }

  getPokemonDetail(pokemonUrl) {
    this._coreServices.displaySpinner(true);
    this._pokemonService
      .getPokemonDetail(pokemonUrl)
      .subscribe((response: any) => {
        this.pokemon = response;
        this._coreServices.displaySpinner(false);
        this._pokemonService
          .getPokemonLocation(response.location_area_encounters)
          .subscribe((location: any) => {
            this.pokemonLocation = location.length ? location : false;
          });
      });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
