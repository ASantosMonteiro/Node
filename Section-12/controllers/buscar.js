const { response } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario,
        Categoria,
        Producto        
} = require("../models");

const  coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos'
];

const buscarUsuarios = async( termino = '', res = response) => {

    const esMongoID = isValidObjectId( termino );

    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp( termino, 'i'); 

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex },{ correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        results: usuario
    });

}

const buscarProductos = async( termino = '', res = response) => {

    const esMongoID = isValidObjectId( termino );

    if(esMongoID){
        const producto = await Producto.findById(termino)
                                        .populate('categoria','nombre');
        res.json({
            results: (producto) ? [producto] : []
        });
    }

    const regex = new RegExp( termino, 'i'); 


    const productos = await Producto.find({ nombre: regex , estado: true })
                                    .populate('categoria','nombre');;

    res.json({
        results: productos
    });

}


const buscarCategorias = async( termino = '', res = response) => {

    const esMongoID = isValidObjectId( termino );

    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    const regex = new RegExp( termino, 'i'); 

    const categorias = await Usuario.find({ nombre: regex , estado: true });

    res.json({
        results: categorias
    });

}

const buscar = async( req , res = response ) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })

    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios( termino, res );
            break;
        case 'categoria':
            buscarCategorias( termino, res );
            break;
        case 'productos':
            buscarProductos( termino, res );
            break;
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            })
            break;
    }

    res.json({
        msg:"lalala"
    });
}


module.exports = buscar;