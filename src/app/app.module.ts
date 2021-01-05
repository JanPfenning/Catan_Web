import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthModule, AuthHttpInterceptor} from '@auth0/auth0-angular';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {CreationService} from './creation/creation.service';
import {LobbyService} from './lobby/lobby.service';
import {GameService} from './game/game.service';
import {CreationModule} from './creation/creation.module';
import {LobbyModule} from './lobby/lobby.module';
import {GameModule} from './game/game.module';
import {AppRoutingModule} from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LandingComponent } from './landing/landing.component';
import {LoginActivate} from './LoginActivate';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PageNotFoundComponent,
    LandingComponent,
    AccessDeniedComponent,
  ],
  imports: [
    BrowserModule,
    CreationModule,
    LobbyModule,
    GameModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: `${environment.AUTH_DOMAIN}`,
      clientId: `${environment.CLIENT_ID}`,
      // Request this audience at user authentication time
      audience: `${environment.AUTH_AUD}`,
      // Specify configuration for the interceptor
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://dev-dhbw-weben2.eu.auth0.com/api/v2/' (note the asterisk)
            uri: `${environment.NEST_HOST}/*`,
            tokenOptions: {
              // The attached token should target this audience
              audience: `${environment.AUTH_AUD}`,
            },
          },
        ],
      },
    }),
    AppRoutingModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    CreationService, LobbyService, GameService, LoginActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
