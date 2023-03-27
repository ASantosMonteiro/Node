import { inquirerMenu, leerInput, pausa } from "./helpers/inquirer.js"



const main = async() => {

    let opt = 0 ;


    do{
        opt = await inquirerMenu();

        switch(opt){
            case 1:
                // Buscar por ciudad
                const ciudad = await leerInput('Ciudad:');
                console.log(ciudad);
            break;

            case 2:

            break;

        }

        console.log(opt);
        await pausa();

    }while(opt !== 0);
}

main();