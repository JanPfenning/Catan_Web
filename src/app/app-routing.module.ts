import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './app.component';
import {BoardComponent} from './creation/board/board.component';
import {RulesComponent} from './creation/rules/rules.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LandingComponent} from './landing/landing.component';
import {LoginActivate} from './LoginActivate';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {GameComponent} from './game/game/game.component';
import {LobbyComponent} from './lobby/lobby/lobby.component';
import {SpectateComponent} from './game/spectate/spectate.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'create', children: [
      {
        path: 'rules',
        component: RulesComponent,
      }, {
        path: 'settings',
        component: BoardComponent,
      }],
    canActivate: [LoginActivate]
  },
  { path: 'join', component: LobbyComponent, canActivate: [LoginActivate] },
  { path: 'game', component: GameComponent, canActivate: [LoginActivate] },
  { path: 'spectate', component: SpectateComponent },
  { path: 'accessDenied', component: AccessDeniedComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
