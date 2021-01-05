import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesComponent } from './rules/rules.component';
import { BoardComponent } from './board/board.component';



@NgModule({
  declarations: [RulesComponent, BoardComponent],
  imports: [
    CommonModule
  ]
})
export class CreationModule { }
