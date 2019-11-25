import React, { Component } from "react";
import './Dash.css'
import Login  from './Login'
import Register from './Register'
import champions from '../../champions.json'
import { mgf } from "node-forge";

export default class Dash extends Component {
  state = {
    showPopup: false,
    champs: []
  };
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  componentDidMount() {

    this.setState({
      champs: champions.data
    })
  }

     
     
     render() {
      let champs =champions.data
    let ch = []
    let top = []
    let jungle = []
    let mid = []
    let adc = []
    let support = []
    for( let name in champs ){
      let properties = (<div>
        {/* {champs[name].key = champs[name].key} */}
        <header>{champs[name].name}</header>
        <img src={champs[name].image.img}/>
        <p>{champs[name].blurb}</p>
        <button>Favorite</button>
      </div>)
      console.log(champs[name].tags)
      if (champs[name].tags === 'Support'){
      support.push(properties)}
      else if (champs[name].tags === "Marksman"){
      adc.push(properties)}
      else if (champs[name].tags === "Mage"){
      mid.push(properties)}
      else if (champs[name].tags === "Assassin"){
      mid.push(properties)}
      else if (champs[name].tags === "Fighter"){
      jungle.push(properties)}
      else if (champs[name].tags === "Tank"){
      top.push()
        
      }
      
      
        
      

    }
    
    // console.log(champions)
    return (
      <div>
      <div>
        <button
          className="button1 "
          onClick={() => {
            this.togglePopup();
          }}
        >
          Login
        </button>
        {this.state.showPopup ? <Login /> : null}
        <Register className="button2" />
      </div>

      </div>
    );
  }
}
