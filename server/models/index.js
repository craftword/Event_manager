import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '${__dirname}/../config/config.json';

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const data = config[env];

const db = {};

// This check the Environment in use whether local and online

let sequelize;
if (data.url) {
  
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
    sequelize = new Sequelize(
        data.database, data.username, data.password, data
    );
}

fs
    .readdirSync(__dirname)
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {

        const model = sequelize.import(path.join(__dirname, file));
        //console.log(model);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;