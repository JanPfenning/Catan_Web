import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesComponent } from './rules/rules.component';
import { BoardComponent } from './board/board.component';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [RulesComponent, BoardComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatCardModule
  ]
})
export class CreationModule { }
