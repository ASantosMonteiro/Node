
const { Router } = require('express');
const { usuarioGet, usuarioPost, usuarioDelete, usuarioPatch, usuarioPut } = require('../controllers/users');

const router = Router();

router.get('/', usuarioGet);
router.post('/', usuarioPost);
router.put('/:id', usuarioPut);
router.patch('/', usuarioPatch);
router.delete('/', usuarioDelete);



module.exports = router