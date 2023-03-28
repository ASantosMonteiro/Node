import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js"
import { Busquedas} from "./models/busquedas.js";
import axios, {isCancel, AxiosError} from 'axios';
import * as dotenv from 'dotenv' 
dotenv.config()


const main = async() => {

    let opt = 0 ;

    const busquedas = new Busquedas();

    do{
        opt = await inquirerMenu();

        switch(opt){
            case 1:
                // Buscar por ciudad
                const lugar = await leerInput('Ciudad: ');
                
                const lugares = await busquedas.ciudad(lugar);
                const id = await listarLugares(lugares);
                if( id === '0' ) continue;

                const lugarSel = lugares.find( l => l.id === id ); 
                busquedas.agregarHistorial(lugarSel.nombre);
                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );

                console.clear();
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:',lugarSel.nombre);
                console.log('lat:',lugarSel.lat);
                console.log('lng:',lugarSel.lng);
                console.log('Temperatura:',clima.temp);
                console.log('Minima:',clima.min);
                console.log('Maxima:',clima.max);
                console.log('El Clima esta: ',clima.desc)

            break;

            case 2:
                // Mostrar historial
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i+1 }.`.green;
                    console.log(`${ idx } ${ lugar }` );

                });
            break;

        }

        if(opt !== 0) await pausa();

    }while(opt !== 0);
}

main();