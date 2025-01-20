import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../config/dbconnect';
import { AdminCreationAttributes } from '../interfaces/auth_interface';

// import models
import Token from './token.model'

const saltRounds = parseInt(process.env.BCRYPT_SALTROUNDS || '10', 10);

class Admin extends Model<AdminCreationAttributes> {
  // public static associate(model:any){
    id!: number;
    profilePhoto!: string | null;
    firstName!: string;
    lastName!: string | null;
    email!: string;
    mobileNumber!: string | null;
    address!: string | null;
    city!: string | null;
    zipCode!: string | null;
    state!: string | null;
    gender!: 'Male' | 'Female' | 'Other' | null;
    dob!: Date | null;
    password!: string;
    isActive!: boolean;
    isDeleted!: boolean;
    roleId!:number;

  // }
  async login(password:string) {
    // Assuming you are using bcrypt for password comparison
    return await bcrypt.compare(password, this.password);
  }

  toSafeObject(){
    const userObj = this.get({plain:true});
    delete userObj?.password;
    return userObj;
  }

  public static associate(){
    Admin.hasMany(Token, { foreignKey: 'adminId', onDelete:"CASCADE" });
  }
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    profilePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'URL or path to the profile photo',
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        isEmail: true,
      },
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ['Male', 'Female', 'Other']
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    roleId:{
      type: DataTypes.INTEGER,
      allowNull: false,

    }
  },
  {
    sequelize,
    modelName: 'Admin',
    tableName: 'admins',
    timestamps: true,

    hooks: {
      beforeCreate: async (user: any) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
    },
  }
);

export default Admin;


// class Admin extends Model<AdminAttributes, AdminCreationAttributes> implements AdminAttributes {
//   public id!: number;
//   public companyName?: string;
//   public profilePhoto?: string;
//   public custom_id?: string;
//   public abn?: string;
//   public contactName?: string;
//   public firstName?: string;
//   public lastName?: string;
//   public position?: string;
//   public email!: string;
//   public mobileNumber?: string;
//   public contactNumber?: string;
//   public address?: string;
//   public businessCategory?: string;
//   public socialMediaUrl?: Record<string, unknown>;
//   public yearly?: boolean;
//   public monthly?: boolean;
//   public otherPlan?: boolean;
//   public paymentDetails?: Record<string, unknown>;
//   public termsAndConditions?: boolean;
//   public password!: string;
//   public businessCode?: string;
//   public referrerCode?: string;
//   public paymentStartDate?: string;
//   public paymentEndDate?: string;
//   public referralsCount?: number;
//   public isSubscription?: boolean;
//   public isPasswordChanged?: boolean;
//   public isSetupCompleted?: boolean;
//   public isActive?: boolean;
//   public isRead?: boolean;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;

//   public static associate(models: any): void {
//     Admin.hasOne(models.BusinessDetails, { foreignKey: 'adminId', as: 'BusinessDetails' });
//     Admin.hasMany(models.Token, { foreignKey: 'adminId', onDelete: 'CASCADE' });
//     Admin.belongsTo(models.Role);
//     Admin.hasMany(models.Referral, { foreignKey: 'sender_id', as: 'referrals', onDelete: 'CASCADE' });
//     Admin.hasMany(models.Invite, { foreignKey: 'admin_id', as: 'invite', onDelete: 'CASCADE' });
//     Admin.hasMany(models.Reward, { foreignKey: 'adminId', as: 'rewards', onDelete: 'CASCADE' });
//     Admin.hasMany(models.Blog, { foreignKey: 'adminId', as: 'blogs', onDelete: 'CASCADE' });
//     Admin.hasMany(models.SocialMedia, { foreignKey: 'adminId', as: 'socialMedia', onDelete: 'CASCADE' });
//     Admin.hasMany(models.PaymentReferrer, { foreignKey: 'adminId', as: 'referrerPayment', onDelete: 'CASCADE' });
//     Admin.hasMany(models.ReferredTo, {
//       foreignKey: 'senderCode',
//       sourceKey: 'businessCode',
//       as: 'referredBusinesses',
//       constraints: false,
//     });
//   }

//   public async login(password: string): Promise<boolean> {
//     return bcrypt.compare(password, this.password);
//   }

//   public toSafeObject(): Partial<AdminAttributes> {
//     const { password, ...safeObject } = this.get({ plain: true });
//     return safeObject;
//   }
// }

// export default (sequelize: Sequelize): typeof Admin => {
//   Admin.init(
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       companyName: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       profilePhoto: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         comment: 'URL or path to the profilePhoto image file',
//       },
//       custom_id: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         comment: 'Custom identifier',
//       },
//       abn: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       contactName: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       position: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           isEmail: true,
//         },
//       },
//       mobileNumber: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       contactNumber: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       address: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       businessCategory: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       socialMediaUrl: {
//         type: DataTypes.JSON,
//         allowNull: true,
//       },
//       yearly: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       },
//       monthly: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       },
//       otherPlan: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false,
//       },
//       paymentDetails: {
//         type: DataTypes.JSON,
//         allowNull: true,
//       },
//       termsAndConditions: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       businessCode: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       referrerCode: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       paymentStartDate: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       paymentEndDate: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       referralsCount: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         defaultValue: 0,
//       },
//       isSubscription: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//       },
//       isPasswordChanged: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//       },
//       isSetupCompleted: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//       },
//       isActive: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//       },
//       isRead: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         defaultValue: false,
//       },
//     },
//     {
//       sequelize,
//       modelName: 'Admin',
//       tableName: 'admins',
//       timestamps: true,
//       indexes: [
//         {
//           unique: true,
//           fields: ['email'],
//         },
//       ],
//       hooks: {
//         beforeCreate: async (user: Admin) => {
//           if (user.password) {
//             user.password = await bcrypt.hash(user.password, saltRounds);
//           }
//           if (!user.businessCode) {
//             user.businessCode = user.roleId === 2 ? await generateUniqueBusinessCodeService(Admin) : '';
//           }
//           if (!user.referrerCode) {
//             user.referrerCode = user.roleId === 3 ? await generateUniqueReferrerCodeService(Admin) : '';
//           }
//         },
//         beforeUpdate: async (user: Admin) => {
//           if (user.changed('password')) {
//             user.password = await bcrypt.hash(user.password, saltRounds);
//           }
//         },
//       },
//     }
//   );

//   return Admin;
// };

// import { model, Schema } from 'mongoose';  

// // const pictureSchema = new Schema({
// //   url: String
// // }, {
// //   _id: false
// // });
// const schema = new Schema({
//   fullName: {
//     type: String,
//     required: true,
//     default: ''
//   },
//   dateOfBirth: {
//     type: Date,
//   },
//   email: {
//     type: String,
//     required: true,
//     lowercase: true
//   },
//   number: {
//     type: String
//   },
//   profile_image: {
//     type:String,
//     default:""
//   },
//   _role: {
//     type: String,
//     required: true,
//     uppercase: true,
//     enum: ['SUPERADMIN', 'USER', 'ADMIN']
//   },
//   password: {
//     type: String
//   },
//   isDefault: {
//     type: Boolean,
//     default: false
//   },
//   status: {
//     type: String,
//     uppercase: true,
//     enum: ['ACTIVE', 'DELETED', 'BLOCKED'],
//     default: 'ACTIVE'
//   }
// },{
//     timestamps: true,
// });

// export const ADMIN = model('admins', schema);
