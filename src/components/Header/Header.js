import React, { Component } from "react";
import "./Header.css";
import Login from "../Dash/Login";
import Register from "../Dash/Register";

export default class Header extends Component {

  render() {
    return (
      <div className="headerstyle">
        <header>
          <img
            className="logo"
            id="html"
            src="https://icon-library.net/images/league-of-legends-logo-icon/league-of-legends-logo-icon-14.jpg"
            alt=""
          />
        </header>
      </div>
    );
  }
}
