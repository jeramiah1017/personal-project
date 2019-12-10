import React, { Component } from "react";
import axios from "axios";
import Logout from "../Dash/Logout";
import { connect } from "react-redux";
import {updateUser} from '../../ducks/userReducer'
import "./account.css";
import {Pie, Doughnut} from 'react-chartjs-2';

// import Graph from '../../Graph'
class Account extends Component {
  state = {
    encryptedId: "",
    faves: [],
    edit: false,
    bio: ""
  };

  componentDidMount() {
    this.getFaves();
    // this.getEncrypt();
  }

  editToggle() {
    this.setState({
      edit: !this.state.edit
    });
  }

  onChange = ({ name, value }) => {
    console.log({ name, value });
    this.setState({
      [name]: value
    });
  };

  editBio(user_id) {
    console.log(this.props)
    axios.put(`/api/bio/${user_id}`, {
      bio: this.props.users.bio
    });
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
  arrLength = (arr) => {
      return arr.length
      
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
    const { users } = this.props;
    const datagraph = {
      labels: ['Top', 'Jungle', 'Mid',
               'Bottom', 'Support'],
      datasets: [
        {
          label: 'Rainfall',
          backgroundColor: [
            '#ffcccc',
            '#cccc00',
            '#003300',
            '#001a1a',
            '#1f004d'
            
          ],
          hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F'
          ],
          data: [this.arrLength(top), this.arrLength(jungle), this.arrLength(mid), this.arrLength(adc), this.arrLength(support)]
        }
      ]
    }
    return (
      <div>
        <h1>{users.username}</h1>
        <button
          onClick={() => {
            this.editToggle();
          }}
        >
          Edit
        </button>
        {this.state.edit ? (
          <div>
            <input
              // onChange={event => this.onChange(event.target)}
              onChange={event => this.props.onChangeBio(event.target.value)}
              className="bio"
              placeholder={this.props.bio}
              name="bio"
              value={this.props.users.bio}
            />
            <button
            className="button"
              onClick={() => {
                this.editBio(users.user_id);
                this.editToggle()
              }}
            >
              Confirm
            </button>
          </div>
        ) : (
          <p className="bio">{users.bio}</p>
        )}
        <Logout classname='button' />
        <Doughnut
          data={datagraph}
          width={160}
          height={50}
          options={{
            title:{
              display:true,
              text:'Favorite Lane',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right',
            
            }
          }}
        />
        <table className="minimalistBlack2">
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
        <table className="minimalistBlack">
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

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: () => dispatch({ type: "UPDATE_USER", payload: "bio" }),
    onChangeBio: (bio) => dispatch({ type: "UPDATE_BIO", value: bio }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
