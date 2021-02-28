import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MqttClient} from 'mqtt';
import {environment} from '../../environments/environment';
import {CatanMap} from '../../model/CatanMap';
import {HexComponent} from './hex-svg/hex/hex.component';
import {VertexComponent} from './hex-svg/vertex/vertex.component';
import {EdgeComponent} from './hex-svg/edge/edge.component';
const mqtt = require('mqtt');

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public board: CatanMap = null;

  public GID: number;
  private httpClient: HttpClient;
  private mqttClient: MqttClient;
  public gameObject: any;
  public playerObject: any;
  public cur_hex_comp: any;
  hex_comps: HexComponent[][];
  vert_comps: VertexComponent[][];
  vert_blueprint: VertexComponent = null;
  edge_comps: EdgeComponent[][];
  edge_blueprint: EdgeComponent = null;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  connectMqtt(): void{
    this.mqttClient = mqtt.connect(environment.MQTT_HOST, {
      port: environment.MQTT_PORT,
      username: environment.MQTT_USER,
      password: environment.MQTT_PASSWORD,
      protocol: environment.MQTT_PROTOCOL
    });
    this.mqttClient.on('connect', () => {
      console.log(`Gameservice connected to mqtt client with id ${this.GID}`);
      this.mqttClient.subscribe(`${environment.MQTT_GAME}/${this.GID}`);
    });
    this.mqttClient.on('error', (error) => {
      console.log(`Gameservice: ${error}`);
      process.exit(2);
    });
    this.mqttClient.on('message', (topic, msg, packet) => {
      // @ts-ignore
      this.interpretBoard(packet.payload.toString('utf-8'));
      // @ts-ignore
      this.interpretGame(packet.payload.toString('utf-8'));
      this.playerInfo().subscribe(ret => {
        console.log('Me:');
        console.log(JSON.parse(ret));
        this.playerObject = JSON.parse(ret);
      });
      // TODO redraw map
    });
  }

  interpretBoard(json: string): void{
    // console.log(json);
    this.board = new CatanMap(json);
    console.log('Board: ');
    console.log(this.board);
    this.hex_comps = [];
    for (let i = 0; i < this.board.width; i++) {
      this.hex_comps[i] = [];
      for (let j = 0; j < this.board.height; j++) {
        this.hex_comps[i][j] = null;
      }
    }
    this.vert_comps = [];
    for (let i = 0; i <= 2 * (this.board.width) + 1; i++) {
      this.vert_comps[i] = [];
      for (let j = 0; j < 2 * (this.board.height) + 1; j++) {
        this.vert_comps[i][j] = null;
      }
    }
    this.edge_comps = [];
    for (let i = 0; i < 4 * (this.board.width + 1) + 2; i++) {
      this.edge_comps[i] = [];
      for (let j = 0; j < 2 * (this.board.height + 1); j++) {
        this.edge_comps[i][j] = null;
      }
    }
  }

  interpretGame(json_str: string): void{
    const json = JSON.parse(json_str);
    this.gameObject = {};
    const {GID, state, bank_res, max_res, max_dev, players, pointsToWin, roll_history, turn, whos_turn} = json;
    this.gameObject.GID = GID;
    this.gameObject.state = state;
    this.gameObject.players = players;
    this.gameObject.max_res = max_res;
    this.gameObject.cur_res = bank_res;
    this.gameObject.max_dev = max_dev;
    this.gameObject.pointsToWin = pointsToWin;
    this.gameObject.rollHistory = roll_history;
    this.gameObject.turn = turn;
    this.gameObject.whos_turn = whos_turn;
    // console.log(json);
    console.log('Game:');
    console.log(this.gameObject);
  }

  playerInfo(): Observable<string>{
    return this.httpClient.get(`${environment.NEST_HOST}/play/${this.GID}/issuerPlayerdata`, {responseType: 'text'});
  }

  determineOrder(): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/play/${this.GID}/determineOrder`, null);
  }

  dice(): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/play/${this.GID}/dice`, null);
  }

  build(structure: number, x: number, y: number): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/play/${this.GID}/build`, {structure, x, y});
  }

  nextTurn(): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/play/${this.GID}/nextTurn`, null);
  }

  request_trade(offer_res: number[], req_res: number[]): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/play/${this.GID}/trade_req`, {offer_res, req_res});
  }

  accept_trade(): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/play/${this.GID}/trade_accept`, null);
  }
}
