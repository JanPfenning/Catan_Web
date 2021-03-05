export enum DevelopmentCardType{
  'Knight', 'Victorypoint', 'Monopoly', 'Roadbuilding', 'YearOfPlenty'
}
export class DevelopmentCard{
  type: DevelopmentCardType;
  used: boolean;
  bought: number;
  constructor(type: DevelopmentCardType) {
    this.type = type;
    this.used = false;
    this.bought = 10000;
  }
}
