const inquirer = require('inquirer');
const colors =  require('colors');

const menuOpts = [{
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: ['opt1','opt2','opt3']
    }
];


const inquirerMenu = async() => {

    console.clear();
    console.log('========================='.blue);
    console.log('  Seleccione una opcion  '.green);
    console.log('=========================\n'.blue);

    const opt = await inquirer.createPromptModule(menuOpts);

    return opt;
}

module.exports = {
    inquirerMenu
}