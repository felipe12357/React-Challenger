import React from 'react';



const PokemonCard=({pokemon,currentText})=>(

        <li >
            <img src={pokemon.img} alt="" />
            <div className="info">
                <h1>{pokemon.Name}</h1>
                    {
                        pokemon.Types.map((type,indexType)=>
                        <span className={`type ${type.toLowerCase()}`} key={indexType}>{type}</span>
                        )
                    }
            </div>
        </li>

);

export default PokemonCard;