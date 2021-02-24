import { Resource } from './Resource';

export enum Structure{
  Settlement , City, Road, Ship, DevelopmentCard
}

export function getCost(structure: Structure): Resource[] {
  switch (structure) {
    case Structure.Settlement:
      return [
        Resource.Wool,
        Resource.Lumber,
        Resource.Brick,
        Resource.Grain,
        ];
    case Structure.City:
      return [
          Resource.Grain,
          Resource.Grain,
          Resource.Ore,
          Resource.Ore,
          Resource.Ore,
       ];
    case Structure.Road:
      return [
          Resource.Brick,
          Resource.Lumber
        ];
    case Structure.Ship:
      return [
          Resource.Wool,
          Resource.Lumber,
        ];
    case Structure.DevelopmentCard:
      return [
          Resource.Wool,
          Resource.Grain,
          Resource.Ore
      ];
  }
}
