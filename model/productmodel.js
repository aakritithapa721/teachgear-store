// src/model/productmodel.js
module.exports = (Sequelize, sequelize) => {
    const Product = sequelize.define('Product', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        price: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        specs: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'Products',
        timestamps: true,
    });

    
    return Product; 
};