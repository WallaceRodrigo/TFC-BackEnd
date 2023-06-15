import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

import SequelizeMatches from './SequelizeMatches';

class SequelizeTeams extends Model<
InferAttributes<SequelizeTeams>,
InferCreationAttributes<SequelizeTeams>
> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

SequelizeTeams.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

SequelizeTeams.hasMany(SequelizeMatches, { foreignKey: 'homeTeamId', as: 'matches' });
SequelizeTeams.hasMany(SequelizeMatches, { foreignKey: 'awayTeamId', as: 'matchesAway' });

SequelizeMatches.belongsTo(SequelizeTeams, { foreignKey: 'homeTeamId', as: 'teams' });
SequelizeMatches.belongsTo(SequelizeTeams, { foreignKey: 'awayTeamId', as: 'teamsAway' });

export default SequelizeTeams;
