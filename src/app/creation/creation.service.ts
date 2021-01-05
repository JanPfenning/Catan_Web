import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreationService {
  rules: {
    p2w: number,
    bank_res: number,
    dev_cards: {
      knight: number,
      vicotrypoint: number,
      monopoly: number,
      road: number,
      yop: number,
    },
    res_fields: {
      brick: number,
      lumber: number,
      wool: number,
      grain: number,
      ore: number,
      gold: number,
    },
    board_height: number,
    board_width: number,
  };
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.rules = {
      p2w: 13,
      bank_res: 20,
      dev_cards: {
        knight: 14,
        vicotrypoint: 2,
        monopoly: 2,
        road: 2,
        yop: 2,
      },
      res_fields: {
        brick: 10,
        lumber: 10,
        wool: 10,
        grain: 10,
        ore: 10,
        gold: 2,
      },
      board_height: 10,
      board_width: 10,
    };
    this.httpClient = httpClient;
  }

  createGame(): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/creation`, this.rules);
  }
}
