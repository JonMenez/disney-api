const { DataTypes } = require('sequelize')
const db = require('../../config/database')
const Genre = require("./genre")


const Content = db.define('content', {
    pk: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    creation_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'contents'
}
);

Content.belongsToMany(Genre, { through: 'ContentGenre' })
Genre.belongsToMany(Content, { through: 'ContentGenre' })

module.exports = Content