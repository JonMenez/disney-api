const { Router } = require('express')
const genreControllers = require('../controllers/genres')

const router = Router()

router.get('/', genreControllers.getGenres)
router.post('/', genreControllers.createGenre)
router.put('/:id', genreControllers.updateGenre)
router.delete('/:id', genreControllers.deleteGenre)

module.exports = router