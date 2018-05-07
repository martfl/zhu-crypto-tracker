import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Crypt from './crypt';
import '../App.css';

class CryptList extends Component {
  constructor() {
    super();
    this.state = {
      crypts: [],
    };
  }

  componentDidMount() {
    fetch('https://api.coinmarketcap.com/v1/ticker/')
      .then(result => result.json())
      .then(data => {
        const crypts = data.map(crypt => <Crypt crypt={crypt} key={crypt.id} />);
        this.setState({ crypts });
      });
  }

  render() {
    return (
      <div className="crypts-list">
        <Helmet>
          <title>zhu - cryptocoin tracker</title>
        </Helmet>
        {this.state.crypts}
      </div>
    );
  }
}

export default CryptList;
