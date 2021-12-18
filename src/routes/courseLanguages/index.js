const router = require('express').Router();
const courseLanguagesController = require('../../controllers/courseLanguages');

router.get('/', courseLanguagesController.getAllLanguages);
router.post('/', courseLanguagesController.addLanguage);
router.get('/:languageId', courseLanguagesController.getLanguage);
router.put('/:languageId', courseLanguagesController.editLanguage);
router.delete('/:languageId', courseLanguagesController.removeLanguage);

module.exports = router;
