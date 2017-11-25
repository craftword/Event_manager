'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _config = require('../config/config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const basename = _path2.default.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const data = _config2.default[env];

const db = {};

// This check the Environment in use whether local and online

let sequelize;

if (data.url) {
    sequelize = new _sequelize2.default(data.url);
} else {
    sequelize = new _sequelize2.default(data.database, data.username, data.password, data);
}

_fs2.default.readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js').forEach(file => {

    const model = sequelize.import(_path2.default.join(__dirname, file));
    //console.log(model);
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

exports.default = db;