const{ Usuario, Categoria, Role }= require('../models');


const esRoleValido =  async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta en la db`)
    }
}

const emailExiste = async( correo = '' ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail){
        throw new Error(`El correo: ${ correo }, ya esta registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ){
        throw new Error(`El id: ${ id }, no existe`);
    }
}

const existeCategoria = async( id ) => {

    const categoriaDB = await Categoria.findById( id );

    if( !categoriaDB ){
        throw new Error('El id no existe');
    }

    
}

const existeProducto = async( id ) => {

    const productoDB = await Producto.findById( id );

    if( !productoDB ){
        throw new Error('El id no existe');
    }

    
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto
}