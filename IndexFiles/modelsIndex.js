const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max, 
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/////////////////////   model   ////////////////////
db.tbl_admin = require('../APIs/admin/models/admin.model')(sequelize, Sequelize);
db.product = require('../APIs/product/model/productModel')(sequelize,Sequelize);


// *********************Foreign Keys********************************************
db.tbl_admin.hasMany(db.product, { foreignKey: 'user_id' })
db.product.belongsTo(db.tbl_admin, { foreignKey: 'user_id' })

module.exports = db;