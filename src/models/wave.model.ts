import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbconnect';
import Admin from './admin.model'; // Import Admin model for associations
import { WaveAttributes } from '../interfaces/interfaces';

interface WaveCreationAttributes extends Optional<WaveAttributes,'id'>{}

// Define the Wave model
class Wave extends Model<WaveCreationAttributes> {
  id!: number;
  wavePhoto?: string;
  waveVideo?: string;
  status!: boolean;
  waveMessage!: string;
  createdBy!: number;

  public static associate() {
    // Associate Wave with Admin
    Admin.hasMany(Wave , { foreignKey: 'createdBy' ,as :"admin", onDelete: 'CASCADE'});
    Wave.belongsTo(Admin, { foreignKey: 'createdBy', as: 'admin', onDelete: 'CASCADE' });
  }
}

Wave.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    wavePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'URL or path to the wave photo',
    },
    waveVideo: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'URL or path to the wave video',
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    waveMessage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Wave',
    tableName: 'waves',
    timestamps: true,
  }
);

export default Wave;
