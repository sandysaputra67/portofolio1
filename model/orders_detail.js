const Sequelize = require('sequelize');
const sequelizeConfig = require('../config/sequelize');
class model extends Sequelize.Model { }
model.init({
 id: {
 type: Sequelize.INTEGER,
 primaryKey: true,
 autoIncrement: true
 },
 orders_id: Sequelize.INTEGER,
 buku_id: Sequelize.INTEGER,
 title: Sequelize.STRING,
 harga: Sequelize.INTEGER,
 quantity: Sequelize.INTEGER,
 total: Sequelize.INTEGER,
 created_at: Sequelize.DATE,
 updated_at: Sequelize.DATE,
 deleted_at: Sequelize.DATE,
}, {
 createdAt: 'created_at',
 updatedAt: 'updated_at',
 deletedAt: 'deleted_at',
 freezeTableName: true,
 timestamps: true,
 paranoid: true,
 sequelize: sequelizeConfig,
 modelName: 'orders_detail',
 tableName: 'orders_detail',
});
 module.exports = model;