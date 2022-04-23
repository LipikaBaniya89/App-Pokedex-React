import React, { Component } from 'react'
// Make custom stuff. Remove these
import '../App.css'
import { FaPlus, FaTrashAlt, FaCross } from 'react-icons/fa';
import Pokedex from "./Pokedex";
import styled from "styled-components";
import Cute from "../cute.png";

class Pokemon extends Component {
    // Constructor 
    constructor(props) {
        super(props);
        this.state = {
            myPokeList: [],
            openModal: false,
        };
    }

    showModal = e => {
        this.setState({
            // Make this toggle. Set value opposite of current value
            openModal: true
        });
    };

  
      hasPokemonInList(id) {
        return this.state.myPokeList.some(element => {
            if (element.id === id) {
                return true;
            }
        });
    }

    addPokemonToList = e => {
        const isFound = this.hasPokemonInList(e.id)
        
        if(!isFound) {
            this.setState({
                myPokeList: [...this.state.myPokeList, e]
            })
        } else {
            alert("Pokemon already added")
        }
    }

    removePokemon(pokeID) {
        const updatedList = this.state.myPokeList.filter(item => item.id !== pokeID);
        this.setState({
            myPokeList: updatedList
        })
    }

  render() {
    const { myPokeList } = this.state;

    const HP = (HP) => {
        if (Number(HP) > 100 ) {
            return "100";
        } else {
            return "0";
        }
    }

    const StrengthLevel = (STR) => {
        if (STR === undefined) {
          return "0";
        }
    
        STR = STR.length;
        if (STR === 1) {
          return "50";
        } else if (STR === 2) {
          return "100";
        } else if (STR === undefined) {
          return "0";
        } else {
          return "0";
        }
      };

      const Weakness = (weak) => {
        if (weak === undefined) {
          return "0";
        }
        weak = weak.length;
    
        if (weak === 1) {
          return "100";
        } else {
          return "0";
        }
      };

      const filter = (damage) => {
        if (isNaN(damage[damage.length - 1])) {
            return Number(damage.substring(0, damage.length - 1));
          } else {
            return Number(damage);
          }
      };

      const damage = (attacks) => {
          if (attacks === undefined) {
              return 0;
          }
          var count = 0;
          for (var i = 0; i< attacks.length; i++) {
              const damage = filter(attacks[i].damage);
              count += damage;
          }
          return count;
      }

      const Happiness = (hp, attacks, weak) => {
          let Happiness = 
          (Number(HP(hp) / 10 ) + damage(attacks) / 10 + 10 - Weakness(weak) / 100) /5;

          return Math.floor(Happiness);
      };

      const HappenessLogos = [];

      for (
        let i = 0;
        i < Happiness(myPokeList.hp, myPokeList.attacks, myPokeList.weaknesses);
        i += 1
      ) {
        HappenessLogos.push(<img src={Cute} alt="cut" />);
      }
  
    return (
            <>
             <div ref={node => { this.node = node; }}></div>
                <h1 className='header'> Pokedex </h1>
                <p className='para'>Is your pokemon on our Codex?</p>
                <div className="App-logo">
                        <button className="add" onClick={e => {this.showModal();}}> <FaPlus/> Add</button>   
                </div>

                <div className='modal-content'>
                    <div className='searchList'>
                        <ul>
                            {myPokeList.map((pokemon) => (
                                <li className="flex" key={pokemon.id}>
                                    <img className="cardImg" src={pokemon.imageUrl} alt="Card image cap" />
                                    <div className="cardBody">
                                        <h5 className="cardTitle">{pokemon.name}</h5>
                                        <div className="pokemondetails">
                                            <div className="ability">
                                                <h4>HP</h4>
                                                <h4>STR</h4>
                                                <h4>Weak</h4>
                                            </div>

                                            <div className="values">
                                                <Hp percentage={HP(pokemon.hp)}>
                                                <div></div>
                                                </Hp>
                                                <Str percentage={StrengthLevel(pokemon.attacks)}>
                                                <div></div>
                                                </Str>
                                                <Weak percentage={Weakness(pokemon.weaknesses)}>
                                                <div></div>
                                                </Weak>
                                            </div>
                                    </div>

                                    <Happinesslevel>
                                    <Happinesslevel>{HappenessLogos}</Happinesslevel>
                                    </Happinesslevel>
                                </div>

                                <button className='success'><FaPlus/></button>
                                <button className='danger' onClick={() => this.removePokemon(pokemon.id)}><FaTrashAlt/></button>
                               
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>

       
            
            <Pokedex openModal={this.state.openModal} addPokemon={this.addPokemonToList} closeModal={this.state.closeModal}/>
        
            </>
        );
    }
}
const Hp = styled.div`
  width: 10rem;
  height: 1.8rem;
  border-radius: 3rem;
  background-color: #e4e4e4;
  div {
    background-color: #f3701a;
    border-radius: 3rem;
    width: ${(props) => props.percentage + "%"};
    height: 100%;
  }

`;
const Str = styled.div`
  width: 10rem;
  height: 1.8rem;
  border-radius: 3rem;
  background-color: #e4e4e4;
  div {
    background-color: #f3701a;
    border-radius: 3rem;
    width: ${(props) => props.percentage + "%"};
    height: 100%;
  }
  
`;
const Weak = styled.div`
  width: 10rem;
  height: 1.8rem;
  border-radius: 3rem;
  background-color: #e4e4e4;

  div {
    background-color: #f3701a;
    border-radius: 3rem;
    width: ${(props) => props.percentage + "%"};
    height: 100%;
  }
`;

const Happinesslevel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  img {
    margin: 0.1rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
`;

export default Pokemon