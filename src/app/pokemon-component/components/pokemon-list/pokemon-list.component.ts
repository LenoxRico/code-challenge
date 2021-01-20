import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '@src/app/shared/services';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';

import { Pokemon } from '../../interfaces';
import { PokemonService } from '../../services';
import { PokemonModalComponent } from '../pokemon-modal';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'favorite'];
  dataSource: any;
  public pageSize = 5;
  public currentPage = 0;
  src = 'assets/pokeball.png';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _pokemonService: PokemonService,
    private _coreServices: CoreService
  ) {}

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons(filter = '', limit = this.pageSize, offset = this.currentPage) {
    this._coreServices.displaySpinner(true);
    this._pokemonService
      .getPokemons(filter, limit, offset)
      .subscribe((response: any) => {
        const data = response.results;
        data.length = response.count;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this._coreServices.displaySpinner(false);
      });
  }

  validateFavStatus(pokemon) {
    const favorite = window.sessionStorage.getItem('favorite-pokemons');
    return favorite && favorite.includes(pokemon)
      ? 'favorite'
      : 'remove_circle';
  }

  addFavorite(pokemon) {
    const favorite = window.sessionStorage.getItem('favorite-pokemons');
    if (favorite) {
      if (favorite.includes(pokemon)) {
        const removePokemon = favorite.replace(pokemon, '');
        window.sessionStorage.setItem('favorite-pokemons', removePokemon);
      } else {
        window.sessionStorage.setItem(
          'favorite-pokemons',
          `${favorite},${pokemon}`
        );
      }
    } else {
      window.sessionStorage.setItem('favorite-pokemons', pokemon);
    }
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.getPokemons('', end, start);
  }

  openDialog(pokemon: Pokemon): void {
    const dialogRef = this.dialog.open(PokemonModalComponent, {
      width: '700px',
      data: {
        pokemon,
      },
    });
    dialogRef.afterClosed().subscribe((_) => {});
  }
}
