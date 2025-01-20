import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbconnect';
import Admin from './admin.model';
import {FriendAttributed} from "../interfaces/auth_interface"


interface FriendCreationAttributes extends Omit<FriendAttributed, 'id'> {}

class Friend extends Model<FriendCreationAttributes, FriendCreationAttributes> implements FriendCreationAttributes {
  public id!: number;
  public friend1!: number;
  public friend2!: number;
  public status?: boolean;
  public isDeleted?: boolean;
  public deletedAt?: Date | null;

  public static associate() {
    Friend.belongsTo(Admin, { foreignKey: 'friend1', as: 'Requester', onDelete: 'CASCADE' });
    Friend.belongsTo(Admin, { foreignKey: 'friend2', as: 'Receiver', onDelete: 'CASCADE' });
  }
}

Friend.init(
  {
    friend1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
        key: 'id',
      },
    },
    friend2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Friend',
    tableName: 'friends',
    timestamps: true,
    paranoid: true, // Enables soft deletes
    deletedAt: 'deletedAt',
  }
);

export default Friend;
