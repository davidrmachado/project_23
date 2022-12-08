import { INTEGER, BOOLEAN, Model } from 'sequelize';

import db from '.';

import Team from './TeamModel';

class Match extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'matches',
});

Team.belongsTo(Match, { foreignKey: 'id', as: 'homeTeam' });

Match.hasMany(Team, { foreignKey: 'id', as: 'homeTeam' });

Team.belongsTo(Match, { foreignKey: 'id', as: 'awayTeam' });

Match.hasMany(Team, { foreignKey: 'id', as: 'awayTeam' });

export default Match;
