import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { SpectateComponent } from './spectate/spectate.component';
import {SharedModule} from '../shared/shared.module';
import { MetaInfoComponent } from './meta-info/meta-info.component';
import { OwnCardsComponent } from './own-cards/own-cards.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import { YearOfPlentyDialogComponent } from './dialog/year-of-plenty-dialog/year-of-plenty-dialog.component';
import { TradeRequestDialogComponent } from './dialog/trade-request-dialog/trade-request-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { HalfResourcesDialogComponent } from './dialog/half-resources-dialog/half-resources-dialog.component';
import { ChooseGoldDialogComponent } from './dialog/choose-gold-dialog/choose-gold-dialog.component';
import { MonopolyDialogComponent } from './dialog/monopoly-dialog/monopoly-dialog.component';

@NgModule({
  declarations: [GameComponent, SpectateComponent, MetaInfoComponent, OwnCardsComponent,
                  YearOfPlentyDialogComponent, TradeRequestDialogComponent, HalfResourcesDialogComponent, ChooseGoldDialogComponent, MonopolyDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ChartsModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatRadioModule,
  ]
})
export class GameModule { }
