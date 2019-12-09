import React, { Component } from "react";
import "./Dash.css";
import Login from "./Login";
import Register from "./Register";

import Swal from "sweetalert2";
import { connect } from "react-redux";

class Dash extends Component {
  state = {
    showLogin: false,
    showRegister: false
    // champs: []
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
  alert() {
    Swal.fire("What are you a dota player ??  Login !");
  }

  render() {
    let champs = this.props.champs;
    let ch = [];
    let top = [];
    let jungle = [];
    let mid = [];
    let adc = [];
    let support = [];
    for (let name in champs) {
      let properties = (
        <div>
          <header>{champs[name].name}</header>
          <a href={`https://u.gg/lol/champions/${champs[name].id}/build/`}>
            <img src={champs[name].image.img} alt="null" />
          </a>
          <li>HP:{champs[name].stats.hp}</li>
          <li>MP:{champs[name].stats.mp}</li>
          <li>Attack Damage:{champs[name].stats.attackdamage}</li>
          <li>Attack Range:{champs[name].stats.attackrange}</li>
          <p>{champs[name].blurb}</p>
          <button
            classname="fav"
            onClick={() => {
              this.alert();
            }}
          >
            Favorite
          </button>
        </div>
      );
      // console.log(champs[name].tags);
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
        champs[name].tags[1] === "Tank"
      ) {
        jungle.push(properties);
      } else if (
        champs[name].tags[0] === "Fighter" ||
        champs[name].tags[1] === "Fighter"
      ) {
        top.push(properties);
      } else ch.push(properties);
    }
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
        <ul className="info">
          <h1>Top</h1>
          <li classname="top">{top}</li>
          <h1>Jungle</h1>
          <li classname="jungle">{jungle}</li>
          <h1>Mid</h1>
          <li classname="mid">{mid}</li>
          <h1>Carry</h1>
          <li classname="adc">{adc}</li>
          <h1>Support</h1>
          <li classname="support">{support}</li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

export default connect(mapStateToProps)(Dash);
