export enum Championships {
  Spain = 'Испания',
  Germany = 'Германия',
  Italy = 'Италия',
  France = 'Франция',
  England = 'Англия',
}

export class FootballTeamModel {
  id: string;
  place: number;
  team: string;
  games: number;
  points: number;
  championship: Championships;
  img: string;
}

export class UpdateFootballTeamModel {
  place: number;
  team: string;
  games: number;
  points: number;
  championship: Championships;
  img: string;
}
