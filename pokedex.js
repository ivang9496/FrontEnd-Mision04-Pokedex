const pokeImg = document.getElementById("pokeImg");
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const inputfield = document.getElementById("nombre");
const inputfield2 = document.getElementById("pokeName");
const inputfield3 = document.getElementById("movimientos");

const ColorFondos = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#10b6a0',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
    
};

const fetchpokemon = () =>{
    let pokeInput = pokeName.value.toLowerCase();
    const url=`https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res)=>{
        if(res.status !="200"){
            
            pokeImage("./imagen/pikachu-pokemon.gif");
            limpiar();
        }
        else{
            return res.json();
        }
        return res.json();

    }).then((data)=>{
     
        //conseguir la imagen del pokemon
       let pokeImg =data.sprites.front_default;
       pokeImage(pokeImg);

    // ID del pokémon
	    let id = data.id;        
        //set_pokeID(id);

    // Nombre del pokémon
	  let name = data.species.name;
      set_pokeName(name,id);

    //tipo de pokemon

    //tipos y atributos
    const { stats, types } = data;
    setFondoColor(types);
    setTipos_pokemon(types);
    renderPokemonStats(stats);  
    
    
    let movimientos = data.moves.map(mov => mov.move.name);
    setMovimientos(movimientos);




    })
}
//fetchpokemon();


const set_pokeName=(name,id)=>{
    const inputfield = document.getElementById("nombre");
    inputfield.value ="#"+id+" "+name;

}

const setFondoColor = types => {
    const colorOne = ColorFondos[types[0].type.name];
    const colorTwo = types[1] ? ColorFondos[types[1].type.name] : ColorFondos.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const setTipos_pokemon = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = ColorFondos[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}


const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const setMovimientos = (movimientos) => {
    let i=0;
    const movimientos2=movimientos;
    const movimientos3=[];
    const inputfield = document.getElementById("movimientos");
    
    for ( i= 0; i < movimientos2.length; i++) {
        movimientos3[i]=(i+1+"-."+movimientos2[i]+"\n");              
    }
        
    inputfield.value = movimientos3.join("");   
    

}


const pokeImage=(url)=>{
    pokeImg.src =url;
}

const limpiar = () => {
    inputfield.value ="error vuelve a intentar";
    inputfield2.value ="";
    inputfield3.value ="";
    pokeStats.innerHTML = '';
    pokeTypes.innerHTML = '';
    
}













//pokeImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png");
