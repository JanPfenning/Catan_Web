import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MqttClient} from 'mqtt';
import {environment} from '../../environments/environment';
import {CatanMap} from '../../model/CatanMap';
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
    // TODO
    this.mqttClient.on('message', (topic, msg, packet) => {
      // console.log(packet);
      // @ts-ignore
      this.interpretBoard(packet.payload.toString('utf-8'));
    });
  }

  interpretBoard(json: string): void{
    // console.log(json);
    this.board = new CatanMap(json);
  }

  // TODO receive own playerdata for visualization
  //  gameobject is distributed via mqtt since its boradcasted
  dice(): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/game/${this.GID}/dice`, null);
  }

  build(structure: number, x: number, y: number): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/game/${this.GID}/build`, {structure, pos: {x, y}});
  }

  request_trade(offer_res: number[], req_res: number[]): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/game/${this.GID}/trade_req`, {offer_res, req_res});
  }

  accept_trade(): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/game/${this.GID}/trade_accept`, null);
  }

  nextTurn(): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/game/${this.GID}/next_turn`, null);
  }
}
