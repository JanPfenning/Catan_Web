import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [LobbyComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LobbyModule { }
