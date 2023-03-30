const { response } = require('express');



const usuarioGet = (req, res = response) => {

    const { nombre, q } = req.query;

    res.json({
        msg: 'get Api Users controller'
    });
  }

  const usuarioPost = (req, res = response) => {
    
    const { mensaje, nombre } = req.body;

    res.json({
        msg: 'post get Api Users controller',
        mensaje,
        nombre
    });
  }
  const usuarioPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put Api Users controller'
    });
  }
  const usuarioPatch = (req, res = response) => {
    res.json({
        msg: 'patch Api Users controller'
    });
  }
  const usuarioDelete = (req, res = response) => {
    res.json({
        msg: 'delete Api Users controller'
    });
  }



  module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPatch,
    usuarioPut,
    usuarioDelete
  }