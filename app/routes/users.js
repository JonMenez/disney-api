const { Router } = require('express')
const userController = require('../controllers/users')

const router = Router()

router.get('/', userController.getUser)

module.exports = router