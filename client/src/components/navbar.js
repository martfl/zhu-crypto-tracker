import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    console.log('logging out');
    axios
      .post('/user/logout')
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null,
          });
        }
      })
      .catch(error => {
        console.log('Logout error');
        console.log(error);
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ');
    console.log(this.props);

    return (
      <div>
        <header className="navbar App-header" id="nav-container">
          <div className="col-4">
            {loggedIn ? (
              <section className="navbar-section">
                <Link to="/" className="btn btn-link text-secondary" onClick={this.logout}>
                  <span>logout</span>
                </Link>
                <Link to="/news" className="btn btn-link text-secondary">
                  <span>news</span>
                </Link>
              </section>
            ) : (
              <section className="navbar-section">
                <Link to="/" className="btn btn-link text-secondary">
                  <span>home</span>
                </Link>
                <Link to="/news" className="btn btn-link text-secondary">
                  <span>news</span>
                </Link>
                <Link to="/login" className="btn btn-link text-secondary">
                  <span>login</span>
                </Link>
                <Link to="/signup" className="btn btn-link">
                  <span>sign up</span>
                </Link>
              </section>
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default Navbar;
