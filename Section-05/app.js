const colors = require('colors');


const { inquirerMenu } = require('./helpers/inquirer');


console.clear();


const main = async() => {

    let opt = '0';
    
    do {

        opt = await inquirerMenu();
        console.log({opt});

    }while( opt !== '0' );
}

main();