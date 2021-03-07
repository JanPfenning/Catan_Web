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
export function name(type: DevelopmentCardType): string{
  switch (type){
    case DevelopmentCardType.Knight: return 'Knight';
    case DevelopmentCardType.Victorypoint: return 'Victory Point';
    case DevelopmentCardType.Monopoly: return 'Monopoly';
    case DevelopmentCardType.Roadbuilding: return 'Roadbuilding';
    case DevelopmentCardType.YearOfPlenty: return 'Year of plenty';
  }
}
