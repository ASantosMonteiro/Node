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


const getInfoPersonaje = async( id ) => {

    try {
        const aventurero = await getAventurero(id);
        const armor = await getArmor(id);
    
        return `La CA del aventurero: ${ aventurero } es de ${ armor }`;
        
    } catch (error) {
        throw error;
    }
}


const id = 2;

getInfoPersonaje( id )
    .then( msg => {
        console.log('TODO BIEN!')
        console.log(msg) 
    })
    .catch( err => {
        console.log('TODO MAL!')
        console.log( err ) 
    });


