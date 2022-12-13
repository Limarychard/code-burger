import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import Category from '../app/models/Category';
import Product from '../app/models/Product';
import User from '../app/models/User';

import configDatabase from '../config/database';

const models = [
  Category,
  Product,
  User,
];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(configDatabase);
    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    mongoose.set('strictQuery', true);
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/codeburger',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
  }
}

export default new Database();
