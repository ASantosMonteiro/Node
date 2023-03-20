const fs = require('fs');
const colors = require('colors');

const crearArchivo = async( base = 5, listar = false, limit = 10) => {
    try {

        let salida = '';

        for(let i = 1; i <= limit; i++){

            salida +=`${base} x ${ i } = ${base * i}\n`;

        }
        if (listar){
            console.log("=================================".rainbow);
            console.log(`Tabla del ${ base }`.rainbow);
            console.log("=================================".rainbow);
            console.log(salida);
        }

        fs.writeFileSync(`./salida/tabla-${ base }.txt`, salida ); 
        
        return `tabla-${ base }.txt`;

    } catch (err) {
        throw err;
    }
    
}

module.exports = {
    crearArchivo
}