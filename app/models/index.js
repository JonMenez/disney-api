const db = require('../../config/database')
const Character = require('./character')
const Content = require('./content')
const Genre = require('./genre')

Character.belongsToMany(Content, { through: 'CharacterContent' });
Content.belongsToMany(Character, { through: 'CharacterContent' });

Content.belongsToMany(Genre, { through: 'ContentGenre' })
Genre.belongsToMany(Content, { through: 'ContentGenre' })

module.exports = db
