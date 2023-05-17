const { Sequelize } = require('sequelize')
require('dotenv').config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT, DB_RAILWAY } = process.env

const database = new Sequelize(DB_RAILWAY)

module.exports = database