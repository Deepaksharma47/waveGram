import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbconnect';
import Wave from './wave.model';
import Admin from './admin.model';
import { WaveCommentAttributes } from '../interfaces/interfaces';

interface CommentCreationAttributes  extends Optional<WaveCommentAttributes,'id'> {}

// Define the WaveComment model
class Comment extends Model {
  public id!: number;
  public comment!: string;
  public waveId!: number;
  public adminId!: number;
  public deletedAt!: Date | null;

  // Optional: Add instance methods if needed later

  public static associate() {
    // A comment belongs to a wave
    Wave.hasMany(Comment,{foreignKey:"waveId", onDelete:"CASCADE"})
    Comment.belongsTo(Wave, { foreignKey: 'waveId', onDelete: 'CASCADE' });

    // A comment belongs to an admin
    Admin.hasMany(Comment,{foreignKey:"adminId", onDelete:"CASCADE"})
    Comment.belongsTo(Admin, { foreignKey: 'adminId', onDelete: 'CASCADE' });
  }
}

// Initialize the WaveComment model
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    waveId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Wave,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Admin,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: true,
    paranoid: true, // Enables soft deletes by using the deletedAt column
  }
);

export default Comment;
