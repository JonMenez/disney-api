const { Router } = require('express')
const characterControllers = require('../controllers/characters')

const router = Router()

router.get('/', characterControllers.getCharacters)
router.get('/:id', characterControllers.getCharacter)
router.post('/', characterControllers.createCharacter)
router.get('/:id/content', characterControllers.getContents)
router.post('/:id/content', characterControllers.addContent)
router.post('/:id/content/content_id', characterControllers.addContent)
router.put('/:id', characterControllers.updateCharacter)
router.delete('/:id', characterControllers.deleteCharacter)

module.exports = router