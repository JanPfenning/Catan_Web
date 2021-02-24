import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { SpectateComponent } from './spectate/spectate.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [GameComponent, SpectateComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class GameModule { }
