import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PokemonModalComponent } from '@src/app/pokemon-component/components/pokemon-modal';
import { Pokemon } from '@src/app/pokemon-component/interfaces';
import { CoreService } from '@src/app/shared/services';

import { Profile } from '../../interfaces';
import { ProfileService } from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInformation: Profile;

  constructor(
    private dialog: MatDialog,
    private _profileService: ProfileService,
    private _router: Router,
    private _coreServices: CoreService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this._coreServices.displaySpinner(true);
    this._profileService.getUser().subscribe((response: any) => {
      this.userInformation = response;
      this.openDialog(response);
      this._coreServices.displaySpinner(false);
    });
  }

  openDialog(pokemon: Pokemon): void {
    const dialogRef = this.dialog.open(PokemonModalComponent, {
      width: '700px',
      data: {
        pokemon,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((_) => this._router.navigate(['/pokemon-list']));
  }
}
