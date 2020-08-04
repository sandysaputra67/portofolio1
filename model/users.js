const Sequelize = require('sequelize')
const sequelizeConfig = require('../config/sequelize')

class model extends Sequelize.Model {}
model.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    role_id: Sequelize.INTEGER,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    freezeTableName: true,
    sequelize: sequelizeConfig,
    modelName: 'users',
    tableName: 'users',
})

module.exports = model
