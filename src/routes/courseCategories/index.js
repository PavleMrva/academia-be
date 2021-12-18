const router = require('express').Router();
const courseCategoriesController = require('../../controllers/courseCategories');

router.get('/', courseCategoriesController.getAllCategories);
router.post('/', courseCategoriesController.addCategory);
router.get('/:categoryId', courseCategoriesController.getCategory);
router.put('/:categoryId', courseCategoriesController.editCategory);
router.delete('/:categoryId', courseCategoriesController.removeCategory);

module.exports = router;
