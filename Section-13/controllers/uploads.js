const { response } = require("express");
const subirArchivo = require("../helpers/subir-archivo");
const { Usuario, Producto } = require('../models');
const cloudinary = require('cloudinary');
cloudinary.config( process.env.CLOUDINARY_URL );

const path = require('path');
const fs = require('fs');

const cargarArchivo = async(req, res = response) => {
  
    try {

        //const nombre = await subirArchivo( req.files, ['txt','md'], 'textos');
        const nombre = await subirArchivo( req.files, undefined, 'imagenes');
        res.json({nombre})

    } catch (msg) {
        res.status(400).json({ msg });
    }
     
    
}

const actualizarImagen = async(req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            
            break;

            case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            
            break;
    
        default:
            return res.status(500).json({ msg: 'No desarrollado aun'});
    }

    try {
        if( modelo.img ){
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if( fs.existsSync( pathImagen )){
                fs.unlinkSync( pathImagen );

            }
        }
    } catch (error) {
        
    }

    const nombre = await subirArchivo( req.files, undefined, coleccion );
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo)
}

const actualizarImagenCloudinary = async(req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            
            break;

            case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            
            break;
    
        default:
            return res.status(500).json({ msg: 'No desarrollado aun'});
    }

    if( modelo.img ){
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[ nombreArr.length - 1 ];
        const [ public_id ] = nombre.split('.');
        await cloudinary.UploadStream.destroy( public_id );
    }

    const { tempFilePath } = req.files.archivo;
    const resp = await cloudinary.UploadStream.upload( tempFilePath );

    modelo.img = nombre;

    await modelo.save();

    res.json(modelo)
}

const mostrarImage = async(req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            break;
            case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
            break;
        default:
            return res.status(500).json({ msg: 'No desarrollado aun'});
    }


    if( modelo.img ){
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync( pathImagen )){
            return res.sendFile(pathImagen);

        }
    }

    const PHImagen = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(PHImagen);
}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImage,
    actualizarImagenCloudinary
}