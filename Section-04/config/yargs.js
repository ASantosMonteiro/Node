const argv = require('yargs')
                .option('b', {
                    alias: 'base',
                    type: 'number',
                    demandOption: true,
                    describe: 'Base de la tabla de multiplicar'
                })
                .option('h', {
                    alias: 'hasta',
                    type: 'number',
                    default: 10,
                    describe: 'Limite de la tabla de multiplicar'
                })
                .option('l', {
                    alias: 'listar',
                    type: 'boolean',
                    default: false,
                    describe: 'lista la tabla'
                })
                .check( (argv, options) => {
                    if( isNaN( argv.b ) ){
                        throw 'La base tiene q ser un numero'
                    }
                    if( isNaN( argv.h ) ){
                        throw 'el limite tiene q ser un numero'
                    }
                    return true
                })
                .argv;

module.exports = argv;