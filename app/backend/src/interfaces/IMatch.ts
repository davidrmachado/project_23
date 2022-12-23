export interface IMatch extends IUpdateMatch{
  homeTeam: string | number,
  awayTeam: string | number,
}

export interface IUpdateMatch {
  homeTeamGoals: string | number,
  awayTeamGoals: string | number
}
