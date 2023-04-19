const express = require('express');
const router = express.Router();
const {list,detail, newest,recomended,add,create,edit,update,deleted,destroy} = require('../../controllers/moviesController');

/* /movies */
router.get('/movies', list);
router.get('/movies/:id', detail);
router.get('/movies', newest);
router.get('/movies', recomended);

//Rutas exigidas para la creación del CRUD
router.get('/movies/add', add);
router.post('/movies/create', create);
router.get('/movies/edit/:id', edit);
router.put('/movies/update/:id', update);
router.get('/movies/delete/:id', deleted);
router.delete('/movies/delete/:id', destroy);

module.exports = router;