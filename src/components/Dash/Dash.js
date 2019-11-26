import React, { Component } from "react";
import "./Dash.css";
import Login from "./Login";
import Register from "./Register";
import champions from "../../champions.json";

export default class Dash extends Component {
  state = {
    showLogin: false,
    showRegister: false,
    champs: []
  };
  toggleLogin() {
    this.setState({
      showLogin: !this.state.showLogin
    });
  }
  toggleRegister() {
    this.setState({
      showRegister: !this.state.showRegister
    });
  }
  componentDidMount() {
    this.setState({
      champs: champions.data
    });
  }

  render() {
    let champs = champions.data;
    let ch = [];
    let top = [];
    let jungle = [];
    let mid = [];
    let adc = [];
    let support = [];
    for (let name in champs) {
      let properties = (
        <div>
          {/* {champs[name].key = champs[name].key} */}
          <header>{champs[name].name}</header>
          <img src={champs[name].image.img} alt='null' />
          <li>HP:{champs[name].stats.hp}</li>
          <li>MP:{champs[name].stats.mp}</li>
          <li>Attack Damage:{champs[name].stats.attackdamage}</li>
          <li>Attack Range:{champs[name].stats.attackrange}</li>
          <p>{champs[name].blurb}</p>
          <button classname='favorite'>Favorite</button>
        </div>
      );
      console.log(champs[name].tags);
      if (
        champs[name].tags[0] === "Support" ||
        champs[name].tags[1] === "Support"
      ) {
        support.push(properties);
      } else if (
        champs[name].tags[0] === "Marksman" ||
        champs[name].tags[1] === "Marksman"
      ) {
        adc.push(properties);
      } else if (
        champs[name].tags[0] === "Mage" ||
        champs[name].tags[1] === "Mage"
      ) {
        mid.push(properties);
      } else if (
        champs[name].tags[0] === "Assassin" ||
        champs[name].tags[1] === "Assassin"
      ) {
        mid.push(properties);
      } else if (
        champs[name].tags[0] === "Tank" ||
        champs[name].tags[1] === "Fighter"
      ) {
        jungle.push(properties);
      } else if (
        champs[name].tags[0] === "Fighter" ||
        champs[name].tags[1] === "Fighter"
      ) {
        top.push(properties);
      } else ch.push(properties);
    }

    // console.log(champions)
    return (
      <div>
        <div>
          <button
            className="button1 "
            onClick={() => {
              this.toggleLogin();
            }}
          >
            Login
          </button>
          {this.state.showLogin ? <Login /> : null}
          <button
            className="button2"
            onClick={() => {
              this.toggleRegister();
            }}
          >
            Register
          </button>
          {this.state.showRegister ? <Register /> : null}
        </div>
        <div className='info'>
        <h1>Top</h1>
        <ul>{top}</ul>
        <h2>Jungle</h2>
        <ul>{jungle}</ul>
        <h3>Mid</h3>
        <ul>{mid}</ul>
        <h4>Carry</h4>
        <ul>{adc}</ul>
        <h5>Support</h5>
        <ul>{support}</ul>
        </div>
      </div>
    );
  }
}
