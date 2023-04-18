const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            buscar: 'api/buscar'
        }

        this.conectarDB();

        this.middlewares();

        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        this.app.use( cors());

        this.app.use(express.json());

        this.app.use( express.static('public'));
    }

    routes(){

        this.app.use(this.paths.usuarios, require('../routes/user'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          });

    }

}


module.exports = Server;