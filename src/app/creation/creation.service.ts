import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Hex} from '../../model/Hex';
import {Harbour} from '../../model/Harbour';
import {HexType} from '../../model/HexType';
import {HexComponent} from '../game/hex-svg/hex/hex.component';
import {Resource} from '../../model/Resource';
import {HarbourType} from '../../model/HarbourType';

@Injectable({
  providedIn: 'root'
})
export class CreationService {
  private httpClient: HttpClient;

  choosenHexType: HexType;
  choosenNumber: 2|3|4|5|6|8|9|10|11|12 = 8;
  choosenHarbour: HarbourType;

  boardHeight = 10;
  boardWidth = 10;

  pointsToWin = 12;
  hexes: Hex[][];
  harbours: Harbour[] = [];
  max_res = 20;
  max_dev = { knight: 20, monopoly: 5, roadbuilding: 5, victorypoint: 5, yop: 5 };
  cur_hex_comp: HexComponent = null;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.ping().subscribe(res => console.log(res));
  }


  createGame(): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/creation`,
{pointsToWin: this.pointsToWin,
        hexes: this.hexes,
        harbours: this.harbours,
        max_res: {brick: this.max_res, lumber: this.max_res, wool: this.max_res, grain: this.max_res, ore: this.max_res},
        max_dev: this.max_dev
      }
    );
  }

  ping(): Observable<string>{
    return this.httpClient.get(`${environment.NEST_HOST}/public/ping`, {responseType: 'text'});
  }
}
