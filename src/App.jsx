import React,{Component} from 'react';
import './App.css';
import NotResult from './Components/NotResult';
import PokemonList from './Components/PokemonList';
import axios from 'axios';
const URL_PATH = "https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json";


class App extends Component{


    state={
        POKEMON_LIST:[],
        currentSearch:[],
        maxCombatPoints:false,
        loading:false,
        currentText:''
    }
    


    handlerCheck=()=>{
      const maxCombat=!this.state.maxCombatPoints;
      this.setState({
        maxCombatPoints:maxCombat
      },this.reorder())
    }

    reorder=()=>{
        let orderPokemons;
     
        if(this.state.maxCombatPoints)
            orderPokemons=this.orderByNumber("Number");
        else
            orderPokemons=this.orderByMaxCP("MaxCP");

        this.setState({
            currentSearch:orderPokemons
        })
    }

    orderByNumber=()=>{
        const orderPokemons=[...this.state.currentSearch];
        orderPokemons.sort((a,b)=>{

            const valueA=parseInt(a.Number);
            const valueB=parseInt(b.Number);

            if(valueA>valueB)
                return 1;
            if(valueA<valueB)
                return -1;
            
            return 0;

        });
        return orderPokemons;
    }

    orderByMaxCP=()=>{
        
        const orderPokemons=[...this.state.currentSearch];
        orderPokemons.sort((a,b)=>{

            const valueA=parseInt(a.MaxCP);
            const valueB=parseInt(b.MaxCP);
            
            if(valueA<valueB)
                return 1;
            if(valueA>valueB)
                return -1;
            
            return 0;
            
        });
        return orderPokemons;
    }


   
    changeHandler=(e)=>{
        e.persist();

        this.setState({
            loading:true,
            currentText:e.target.value
        })

        axios.get(URL_PATH) 
        .then(response=>{

            this.setState({
                POKEMON_LIST:response.data,
                loading:false
            },this.filterPokemons(e.target.value.toLowerCase()))
        })
    }

    filterPokemons(valueSended){
        const currentSearch=this.state.POKEMON_LIST.filter((pokemon)=>{

            let inType=false;

            pokemon.Types.forEach(type => {
                if(type.toLowerCase().indexOf(valueSended )!==-1)
                    inType=true;
            });

            if(pokemon.Name.toLowerCase().indexOf(valueSended )!==-1 || inType)
               return pokemon;

            return null;
        });


        this.setState({
            currentSearch:currentSearch
        })


    }

    render(){

        return (
            <React.Fragment>
                <label htmlFor="maxCP" className="max-cp">
                    <input type="checkbox" id="maxCP" onChange={this.handlerCheck}/>
                    <small>
                        Maximum Combat Points
                    </small>
                </label>
                <input type="text" className="input" placeholder="Pokemon or type" onChange={this.changeHandler} />
                {(this.state.loading)?<div className="loader"></div>:null}
                <ul className="suggestions">
                    {    (this.state.currentSearch.length>0)?
                                <PokemonList pokemonList={this.state.currentSearch} currentText={this.state.currentText}/> :
                                <NotResult /> 
                    }
                </ul>
            </React.Fragment>
        )
    }
}

export default App;
