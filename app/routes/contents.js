const { Router } = require('express')
const contentControllers = require('../controllers/contents')

const router = Router()

router.get('/', contentControllers.getContents)
router.get('/:id', contentControllers.getContent)
router.post('/', contentControllers.createContent)
router.get('/:id/genre', contentControllers.getGenres)
router.post('/:id/genre', contentControllers.addGenre)
router.post('/:id/genre/genre_id', contentControllers.deleteGenre)
router.put('/:id', contentControllers.updateContent)
router.delete('/:id', contentControllers.deleteContent)

module.exports = router