import React from 'react';
import PokemonCard from './PokemonCard';


const PokemonList=({pokemonList,currentText})=>(

    pokemonList.map((pokemon,indexPokemon)=>{
        if(indexPokemon<4){
            return <div key={indexPokemon}>
                <PokemonCard pokemon={pokemon} currentText={currentText}/>
            </div>
        }
        return null
        
    })

);

export default PokemonList;