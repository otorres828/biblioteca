var Sequelize = require('sequelize').Sequelize;
var config = require('./config.js');

var dbConfig = config;
var sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      dialectOptions: {
        useUTC: false,
        dateStrings: true,
        typeCast: function (field, next) {
          if (field.type === 'DATETIME') {
            return field.string();
          }
          return next();
        },
      },
      timezone: dbConfig.timezone
    }
);

module.exports = sequelize;
