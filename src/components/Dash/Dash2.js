import React, { Component } from "react";
// import champions from "../../champions.json";
import "./Dash.css";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { connect } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

class Dash2 extends Component {
  favorite(name, image, key) {
    axios.post("/api/faves", { name, image, key }).then(res => {
      Swal.fire(res.data);
    });
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

          <li>HP:{champs[name].stats.hp}</li>
          <li>MP:{champs[name].stats.mp}</li>
          <li>Attack Damage:{champs[name].stats.attackdamage}</li>
          <li>Attack Range:{champs[name].stats.attackrange}</li>
          <a href={`https://u.gg/lol/champions/${champs[name].id}/build/`}>
            <img src={champs[name].image.img} alt="null" />
          </a>

          <button
            classname="favorite"
            onClick={() =>
              this.favorite(
                champs[name].name,
                champs[name].image.img,
                champs[name].tags
              )
            }
          >
            Favorite
          </button>
        </div>
      );

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
    const { users } = this.props;

    return (
      <div>
        <Link to="/${username}">
          <h1 className="Welcome"> Welcome {users.username} ! </h1>
        </Link>
        <Logout />
        <div className="info">
          <h2>Top</h2>
          <li>{top}</li>
          <h2>Jungle</h2>
          <li>{jungle}</li>
          <h2>Mid</h2>
          <li>{mid}</li>
          <h2>Carry</h2>
          <li>{adc}</li>
          <h2>Support</h2>
          <li>{support}</li>
        </div>
      </div>
    );
  }
}
function mapStateToProps(reduxState) {
  return reduxState;
}

export default connect(mapStateToProps)(Dash2);
