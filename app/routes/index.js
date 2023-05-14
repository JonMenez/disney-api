const authRouter = require('./auth')
const characterRouter = require('./characters')
const contentRouter = require('./contents')
const genreControllers = require('./genres')
const userRouter = require('./users')

module.exports = {
    authRouter,
    characterRouter,
    contentRouter,
    genreControllers,
    userRouter
}