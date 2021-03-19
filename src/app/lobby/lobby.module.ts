import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby/lobby.component';
import {SharedModule} from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [LobbyComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatCardModule
    ]
})
export class LobbyModule { }
