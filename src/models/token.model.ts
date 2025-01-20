import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/dbconnect';
import Admin from './admin.model'; // Adjust the import path if needed

interface TokenAttributes {
    token: string;
    adminId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

class Token extends Model<TokenAttributes> implements TokenAttributes {
    public token!: string;
    public adminId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        Token.belongsTo(Admin, { foreignKey: 'adminId', onDelete: 'CASCADE' });
    }
}

Token.init(
    {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            // primaryKey: true, // Using `token` as the primary key
        },
        adminId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Token',
        tableName: 'tokens',
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        // id:false,
    }
);

export default Token;
