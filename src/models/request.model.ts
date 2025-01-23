import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbconnect';
import { RequestInterface } from '../interfaces/auth_interface';
import Admin from './admin.model'; // Import the Admin model

interface RequestCreationInterface extends Optional<RequestInterface, 'id'> {}

class FriendRequest extends Model<RequestCreationInterface> {
  id!: number;
  senderId!: number;
  recevierFirstName!: string;
  recevierLastName!: string;
  receiverEmail!: string;
  message?: string;
  status!: boolean;

  static associate() {
    // Associate FriendRequest with Admin as the sender
    FriendRequest.belongsTo(Admin, { foreignKey: 'senderId', as: 'sender', onDelete:"CASCADE" });
    Admin.hasMany(FriendRequest,{foreignKey:'senderId' , onDelete:"CASACDE"})
  }
}

FriendRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'ID of the sender',
    },
    recevierFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'First name of the receiver',
    },
    recevierLastName: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Last name of the receiver',
    },
    receiverEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      comment: 'Email of the receiver',
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Optional message sent with the friend request',
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: 'Status of the friend request, default is pending',
    },
  },
  {
    sequelize,
    modelName: 'FriendRequest',
    tableName: 'friend_requests',
    timestamps: true, // Automatically adds createdAt and updatedAt columns
  }
);

export default FriendRequest;
