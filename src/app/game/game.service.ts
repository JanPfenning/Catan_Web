import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MqttClient} from 'mqtt';
import {environment} from '../../environments/environment';
const mqtt = require('mqtt');

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private id: number;
  // TODO var game map
  private httpClient: HttpClient;
  private mqttClient: MqttClient;
  public gameObject: any;
  public playerObject: any;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.mqttClient = mqtt.connect(environment.MQTT_HOST, {
      port: environment.MQTT_PORT,
      username: environment.MQTT_USER,
      password: environment.MQTT_PASSWORD,
      protocol: environment.MQTT_PROTOCOL
    });
    this.mqttClient.on('connect', () => {
      console.log(`Gameservice connected to mqtt client`);
    });
    this.mqttClient.on('error', (error) => {
      console.log(`Gameservice: ${error}`);
      process.exit(2);
    });
  }

  // TODO receive own playerdata for visualization
  //  gameobject is distributed via mqtt since its boradcasted
  dice(): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/game/${this.id}/dice`, null);
  }

  build(structure: number, x: number, y: number): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/game/${this.id}/build`, {structure, pos: {x, y}});
  }

  request_trade(offer_res: number[], req_res: number[]): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/game/${this.id}/trade_req`, {offer_res, req_res});
  }

  accept_trade(): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/game/${this.id}/trade_accept`, null);
  }

  nextTurn(): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/game/${this.id}/next_turn`, null);
  }
}
