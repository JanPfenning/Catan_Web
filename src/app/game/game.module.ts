import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { SpectateComponent } from './spectate/spectate.component';
import {SharedModule} from '../shared/shared.module';
import { MetaInfoComponent } from './meta-info/meta-info.component';
import { OwnCardsComponent } from './own-cards/own-cards.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {AppModule} from '../app.module';


@NgModule({
  declarations: [GameComponent, SpectateComponent, MetaInfoComponent, OwnCardsComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ChartsModule,
  ]
})
export class GameModule { }
