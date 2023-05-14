const { DataTypes } = require('sequelize')
const db = require('../../config/database')
const Content = require('./content')

const Character = db.define('character', {
    pk: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    weight: {
        type: DataTypes.INTEGER,
    },
    history: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'characters'
}
);

Character.belongsToMany(Content, { through: 'CharacterContent' });
Content.belongsToMany(Character, { through: 'CharacterContent' });


module.exports = Character