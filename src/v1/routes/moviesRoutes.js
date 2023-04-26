const express = require('express');
const router = express.Router();
const {list,detail,store,update,destroy} = require('../../controllers/moviesController');

/* /api/v1/movies */
router.get('/', list);
router.get('/:id', detail);

router.post('/', store);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;