// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  CLIENT_ID: 'l5EDF5p1700YaP8n0YFbb1Q5s0zcoXOF',
  AUTH_DOMAIN: 'auth_domain.eu.auth0.com',
  AUTH_AUD: 'https://your-api-aud',

  MQTT_HOST: 'ws://192.168.178.100',
  MQTT_PORT: 1884,
  MQTT_USER: 'mqttUser',
  MQTT_PASSWORD: 'mqttPass',
  MQTT_LOBBY: 'catan_mqtt/lobby',
  MQTT_GAME: 'catan_mqtt/game',
  MQTT_PROTOCOL: 'tcp',

  NEST_HOST: 'http://localhost:3000',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
