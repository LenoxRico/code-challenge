import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PokemonModalComponent } from '@src/app/pokemon-component/components/pokemon-modal';
import { Pokemon } from '@src/app/pokemon-component/interfaces';
import { CoreService, NotificationService } from '@src/app/shared/services';

import { Favorite } from '../../interfaces';
import { FavoriteService } from '../../services';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  favoriteInformation: Favorite;
  displayedColumns: string[] = ['name', 'favorite'];
  dataSource: any;
  public pageSize = 5;
  public currentPage = 0;
  src = 'assets/pokeball.png';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _favoriteService: FavoriteService,
    private _router: Router,
    private _translate: TranslateService,
    private _notificationService: NotificationService,
    private _coreServices: CoreService
  ) {}

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites() {
    this._coreServices.displaySpinner(true);
    this._favoriteService.getFavorites().subscribe((response: any) => {
      const data = response.split(',');
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this._coreServices.displaySpinner(false);
      this.validateFavorites(data);
    });
  }

  removeFavorite(pokemon) {
    const favorite = window.sessionStorage.getItem('favorite-pokemons');
    if (favorite) {
      const removePokemon = favorite.replace(pokemon, '');
      window.sessionStorage.setItem('favorite-pokemons', removePokemon);
      const data = removePokemon.split(',');
      this.dataSource = new MatTableDataSource(data);
      this.validateFavorites(data);
    }
  }

  validateFavorites(data) {
    if (!data.length || data[0] === '') {
      this._translate
        .get(`favorite-component.favorite-list.empty`)
        .subscribe((text) => {
          this._notificationService.showNotification(text, false);
          this._router.navigate(['/pokemon-list']);
        });
    }
  }

  openDialog(pokemon: Pokemon): void {
    const data = {
      name: pokemon,
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon}`,
    };
    const dialogRef = this.dialog.open(PokemonModalComponent, {
      width: '700px',
      data: {
        pokemon: data,
      },
    });
    dialogRef.afterClosed().subscribe((_) => {});
  }
}
