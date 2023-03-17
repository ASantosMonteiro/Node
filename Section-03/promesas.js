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

const getAventurero = ( id ) => {

    
    return new Promise(( resolve, reject ) => {

        const aventurero = aventureros.find( e => e.id === id )?.nombre;

        ( aventurero ) 
            ? resolve( aventurero )
            : reject( `No existe aventurero con id ${ id }` );
    });
}

const getArmor = () => {
    return new Promise(( resolve, reject ) => {

        const armor = armors.find( s => s.id === id )?.armor;

        ( armor ) 
            ? resolve( armor )
            : reject( `No existe armor con id ${ id }` );
    });
}

const id = 2;

let nombre;

getAventurero(id)
    .then( aventurero => {
        nombre = aventurero;
        return getArmor( id ) 
    })
    .then( armor => console.log( 'El aventurero:', nombre, 'tiene una armor class de:', armor ))
    .catch( err => console.log( err ) );


