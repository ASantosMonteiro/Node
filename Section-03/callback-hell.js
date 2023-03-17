const aventureros = [
    {
        id: 1,
        nombre: 'Loucian'
    },
    {
        id: 2,
        nombre: 'Zykren'
    },
    {
        id: 3,
        nombre: 'Kallista'
    }
];

const armors = [
    {
        id: 1,
        armor: 18
    },
    {
        id: 2,
        armor: 21
    }
];

const getAventurero = ( id, callback ) => {

    const aventurero = aventureros.find( e => e.id === id )?.nombre

    if ( aventurero ) {
        callback( null, aventurero );
    } else {
        callback(`Aventurero con id ${ id } no existe`);
    }
}

const getArmor = ( id, callback ) => {

    const armor = armors.find( s => s.id === id )?.armor;

    if ( armor ) {
        callback( null, armor );
    } else {
        callback( `No existe armor para el id ${ id }` );
    }

}

const id = 2;

getAventurero( id, ( err, aventurero ) => {

    if ( err ) {
        console.log('ERROR!');
        return console.log(err);
    }

    getArmor(id, (err, armor) => {

        if ( err ) {
            return console.log(err);
        }
    
        console.log('El aventurero:', aventurero, 'tiene una armor class de:', armor )
    })

})









