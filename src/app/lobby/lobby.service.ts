import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '@auth0/auth0-angular';
import {MqttClient} from 'mqtt';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
const mqtt = require('mqtt');

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  lobbyOwner: string;
  id: number;
  player: {name: string, color: string}[] = [];
  me: {id: string, name: string, color: string};
  httpClient: HttpClient;
  authService: AuthService;
  mqttClient: MqttClient;

  constructor(httpClient: HttpClient, authService: AuthService, router: Router, route: ActivatedRoute) {
    this.httpClient = httpClient;
    this.authService = authService;

    this.connectMqtt();
  }

  onChange(): Observable<any>{
    return this.httpClient.post<any>(`${environment.NEST_HOST}/creation/${this.id}`, this.me);
  }

  // TODO leave lobby

  start(): void{
    // this.authService.user$.subscribe(val => console.log(val.sub));
    this.httpClient.post<any>(`${environment.NEST_HOST}/game/${this.id}`, this.me);
  }

  // TODO: handle password for lobby elsewise
  getLobbyPass(id?: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    if (id === undefined){
      id = this.id;
    }
    return this.httpClient.get<any>(`${environment.NEST_HOST}/creation/${id}`, { headers, responseType: 'text' as 'json' });
  }

  connectMqtt(): void {
    this.mqttClient = mqtt.connect(`${environment.MQTT_HOST}`, {
      port: environment.MQTT_PORT,
      username: environment.MQTT_USER,
      password: environment.MQTT_PASSWORD,
      protocol: environment.MQTT_PROTOCOL
    });
    this.mqttClient.on('connect', () => {
      console.log(`Lobbyservice connected to mqtt client`);
      this.mqttClient.subscribe(`${environment.MQTT_LOBBY}/${this.id}`);
    });
    this.mqttClient.on('message', (topic, msg, packet) => {
      // @ts-ignore
      this.player = JSON.parse(packet.payload.toString('utf-8'));
      console.log(this.player);
    });
    this.mqttClient.on('error', (error) => {
      console.log(`Lobbyservice: ${error}`);
      process.exit(2);
    });
  }
}
