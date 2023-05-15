const { Router } = require('express')
const characterControllers = require('../controllers/characters')

const router = Router()

router.get('/', characterControllers.getCharacters)
router.get('/:id', characterControllers.getCharacter)
router.post('/', characterControllers.createCharacter)
router.delete('/:id', characterControllers.deleteCharacter)
router.put('/:id', characterControllers.updateCharacter)
router.get('/:id/content', characterControllers.getContents)
router.post('/:id/content', characterControllers.addContent)
router.delete('/:id/content/content_id', characterControllers.deleteContent)

module.exports = router