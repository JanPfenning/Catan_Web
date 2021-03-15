export class Meta {
  /**
   * @param owner is the user owner of the lobby
   */
  readonly owner: boolean;
  /**
   * @param name displayed name, not needed to be unique
   */
  readonly name: string;
  /**
   * @param colour hexcode of color in which player is shown
   */
  readonly colour: string;
  /**
   * @param PID id in current Lobby
   */
  readonly PID: number;
  /**
   * @param points current victory points
   */
  private points: number;

  /**
   * @param longestRoad length of own road
   */
  ownRoad = 0;

  /**
   * @param largestArmy size of own army
   */
  ownArmy = 0;

  /**
   * @param resourceAmount number of resources
   */
  resourceAmount = 0;
  /**
   * @param devAmount number of development cards
   */
  devAmount = 0;

  constructor(name: string, colour: string) {
    this.name = name;
    this.colour = colour;
    this.PID = Date.now();
    this.points = 0;
  }
}

export class Playerentity{

  /**
   * @param sub id from oauth account
   */
  sub: string;

  /**
   * @param resources tuple of resource and amount
   */
  resources: any;

  /**
   * @param develoment_cards tuple of dev_cards and amount
   */
  development_cards: any;

  /**
   * @param structures_left tuple of dev_cards and amount
   */
  structures_left: any;

  /**
   * @param meta Meta information that can be published
   */
  meta: Meta;

  /**
   * @param name displayed name, not needed to be unique
   * @param colour hexcode of color in which player is shown
   * @param sub id from oauth account
   */
  constructor(name: string, colour: string, sub: string, resources: any, development_cards: any, structures_left: any) {
    this.meta = new Meta(name, colour);
    this.sub = sub;
    this.resources = resources;
    this.development_cards = development_cards;
    this.structures_left = structures_left;
  }
}
