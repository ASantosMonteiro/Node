const { response } = require('express');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try{

        const usuario = await Usuario.findOne({ correo });
        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        const token  = await generarJWT( usuario.id );



        res.json({
                msg: 'login ok',
                token
            })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

    
}

const googleSingIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify(id_token);
        let usuario = await Usuario.findOne({ correo });

        
        if( !usuario ){
            const data = {
                nombre,
                correo,
                password: ':D',
                img,
                google: true
            };

            usuario = new Usuario(data);
            console.log(usuario);
            await usuario.save();

        }

        if( !usuario.estado ){
            res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        const token  = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }
    

}

module.exports = {
    login,
    googleSingIn
}