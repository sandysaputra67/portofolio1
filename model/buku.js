const Sequelize = require('sequelize')
const sequelizeConfig = require('../config/sequelize')
class model extends Sequelize.Model { }
model.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    stok: Sequelize.STRING,
    sinopsis:Sequelize.STRING,
    kategori_id: Sequelize.INTEGER,
    title: Sequelize.STRING,
    harga: Sequelize.INTEGER,
    deskripsi: Sequelize.STRING,
    author: Sequelize.STRING,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
    image_url: Sequelize.STRING,
    no_isbn: Sequelize.STRING,
    berat: Sequelize.INTEGER,
   
    
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConfig,
    modelName: 'buku',
    tableName: 'buku',

});
module.exports = model;
