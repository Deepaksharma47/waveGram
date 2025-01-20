import fs from 'fs';
import path from 'path';
import sequelize from '../config/dbconnect';
import { Sequelize } from 'sequelize';

const models: { [key: string]: any } = {};

// Dynamically load all models in the current directory
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.ts' && file.endsWith('.model.ts'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default;
    models[model.name] = model;
  });

// Establish associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

const db = {
  sequelize,
  Sequelize,
  ...models,
};

export default db;
