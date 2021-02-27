import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { SpectateComponent } from './spectate/spectate.component';
import {SharedModule} from '../shared/shared.module';
import { MetaInfoComponent } from './meta-info/meta-info.component';
import { OwnCardsComponent } from './own-cards/own-cards.component';


@NgModule({
  declarations: [GameComponent, SpectateComponent, MetaInfoComponent, OwnCardsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class GameModule { }
