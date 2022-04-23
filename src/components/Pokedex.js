import React, { Component } from 'react'
import '../App.css'
import styled from "styled-components";
import Cute from "../cute.png";
import { FaPlus, FaTrashAlt, FaTimes, FaSearch } from 'react-icons/fa';

class Pokedex extends Component {
    // Constructor 
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            openModal:true,
            searchItems: [],
            DataisLoaded: false,
        };
    }

    componentDidMount() {
        fetch("http://localhost:3030/api/cards")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.cards,
                    DataisLoaded: true
                });
            })
    }

    addNewPokemon(pokemon) {
        this.props.addPokemon(pokemon);
    }

    
    closeModal = e => {
      this.setState({
        closeModal:false
      })
    };

    handleChange = (e) => {
      let searchRes = [];

      if(e) {
          searchRes = this.state.items.filter((item) => {
              let name = item.name.toLowerCase();
              let type = item.type.toLowerCase();
              return (name.includes(e.toLowerCase())) || (type.includes(e.toLowerCase()));
          });
          this.setState({
              searchItems: searchRes
          });
      } else {
          this.setState({
              searchItems: []
          });
      }
  };

    render() {
        const { DataisLoaded, items, searchItems } = this.state;
        let pokeList = items;
        
        if(searchItems.length > 0) {
            pokeList = searchItems;
        }

        if (!DataisLoaded)
            return <div>
                <h1> Pleses wait some time.... </h1>
            </div>;

        if (!this.props.openModal) {
            return null;
        }

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
            i < Happiness(items.hp, items.attacks, items.weaknesses);
            i += 1
          ) {
            HappenessLogos.push(<img src={Cute} alt="cut" />);
          }
      
       
      return (  
        <>
        <div className='CardSize poke-modal'>
                <div className='searchBar'>
                    <input type="text" className="searchBar" placeholder="Search pokemon by name"  onChange={(e) => this.handleChange(e.target.value)}/>
                    <FaSearch style={{fontSize:"20px", color:"#fafafa"}}/>   
                </div>

                  <div className="App-logo">
                    <button className="close" onClick={this.closeModal}> <FaTimes/></button>
                  </div>

                  <div className='modal-content'>
                      <div className='searchList'>
                          <ul>
                              {pokeList.map((pokemon) => (
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
                                      <button className='success' onClick={() => this.addNewPokemon(pokemon)}><FaPlus/></button>
                                      
                                  </li>
                              ))
                              }
                          </ul>
                      </div>
                  </div>
                </div>
            
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

export default Pokedex