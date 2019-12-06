import React, { Component } from "react";
import axios from "axios";
import Logout from "../Dash/Logout";
import { connect } from "react-redux";
import "./account.css";
// import Graph from '../../Graph'
class Account extends Component {
  state = {
    encryptedId: "",
    faves: []
  };
  componentDidMount() {
    this.getFaves();
    // this.getEncrypt();
  }
  // getEncrypt() {
  //   // axios.get('/api/encrypt')
  //   axios
  //     .get(
  //       `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.props.username}?api_key=RGAPI-2d69d28e-b39b-4c09-ae86-72499e48983b`
  //     )
  //     .then(response => {
  //       console.log(response);
  //       // return axios.get(...); // using response.data
  // });
  // .then((response) => {
  //   console.log('Response', response);
  // });
  // axios
  //   .get(`/lol/summoner/v4/summoners/by-name/${this.props.username}`)
  //   .then(res => {
  //     this.setState = {
  //       encryptedId: res.body.id
  //     };
  //     console.log(this.state.encryptedId);
  //   });
  // }
  delete = favorites_id => {
    console.log(favorites_id);
    axios.delete(`/api/deletefaves/${favorites_id}`).then(res => {
      this.setState({
        faves: res.data
      });
    });
  };
  getFaves() {
    axios.get("/api/faves").then(res => {
      console.log(res.data);
      this.setState({
        faves: res.data
      });
    });
  }
  mapover(arr) {
    console.log(arr);
    return arr.map(obj => (
      <div>
        <p>{obj.name}</p>
        <img classname="img" src={obj.image} alt="" />
        <button
          onClick={() => {
            this.delete(obj.favorites_id);
          }}
        >
          delete
        </button>
      </div>
    ));
  }
  render() {
    const champs = this.state.faves;
    let top = this.mapover(champs.filter(key => key.key.includes("Fighter")));
    let adc = this.mapover(champs.filter(key => key.key.includes("Marksman")));
    let jungle = this.mapover(champs.filter(key => key.key.includes("Tank")));
    let mid = this.mapover(
      champs.filter(key => key.key.includes("Mage" || "Assassin"))
    );
    let support = this.mapover(
      champs.filter(key => key.key.includes("Support"))
    );

    return (
      <div>
        <h1>{this.props.username}</h1>
        <p class="bio">{this.props.bio}<button>Edit</button></p>
        <Logout />
        <table class="minimalistBlack2">
          <thead>
            <tr>
              <th>Wins</th>
              <th>Losses</th>
              <th>Rank</th>
              <th>Win %</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>245</td>
              <td>270</td>
              <td>SILVER</td>
              <td>47%</td>
            </tr>
          </tbody>
        </table>
        <table class="minimalistBlack">
          <thead>
            <tr>
              <th>Top</th>
              <th>Jungle</th>
              <th>Mid</th>
              <th>Bottom</th>
              <th>Support</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{top}</td>
              <td>{jungle}</td>
              <td>{mid}</td>
              <td>{adc}</td>
              <td>{support}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
function mapStateToProps(reduxState) {
  return reduxState;
}
export default connect(mapStateToProps)(Account);
