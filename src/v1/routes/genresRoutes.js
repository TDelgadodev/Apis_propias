const express = require('express');
const router = express.Router();
const {list,detail, store,update,destroy} = require('../../controllers/genresController');




/* /genres */
router.get('/genres',list);
router.get('/genres/:id', detail);
router.post('/genres',store);
router.put('/genres/:id',update);
router.delete('/genres/:id',destroy)



module.exports = router;