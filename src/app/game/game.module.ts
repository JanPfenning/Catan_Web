import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { SpectateComponent } from './spectate/spectate.component';



@NgModule({
  declarations: [GameComponent, SpectateComponent],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
