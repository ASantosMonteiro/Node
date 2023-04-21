const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, actualizarImagen, mostrarImage, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarArchivosSubir, validarCampos } = require('../middlewares');


const router = Router();

router.post( '/', cargarArchivo );

router.put('/:coleccion/:id',[
    validarArchivosSubir,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    validarCampos
], actualizarImagenCloudinary)
//actualizarImagen)

router.get('/:coleccion/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    validarCampos
], mostrarImage)
 
module.exports = router;