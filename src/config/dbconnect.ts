// import mongoose from 'mongoose';

// const databaseConnector = async () => new Promise<any>((resolve, reject) => {
//   mongoose.set('strictQuery', false);
//   mongoose.connect(String(process.env.MONGO_URI), {
//   })
//     .then(db => {
//       console.log('Database connection established');

//       resolve(db);
//     })
//     .catch(reject);
// });

// export { databaseConnector };




import  {Sequelize} from "sequelize"

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_HOST as string,process.env.BD_PASSWORD as string,{
    host : "localhost",
    dialect: "mysql"
} )

export const dbconnect = () =>{
    sequelize.sync({alter:true}).then(()=>{
        console.log("database connected and syncronized successfully")
    }).catch((err) =>{
        console.log(err)
        console.log("problem n connecting database")
    })
}

export default sequelize;