import React from 'react';
import Modal from 'react-modal';
import ReactChartKick, { AreaChart } from 'react-chartkick';
import Chart from 'chart.js';
import 'cryptocoins-icons/webfont/cryptocoins-colors.css';
import 'cryptocoins-icons/webfont/cryptocoins.css';

ReactChartKick.addAdapter(Chart);
Modal.setAppElement('#root');

const stylesOfPercForPositiveChanges = { color: '#1CD7FF' };
const stylesOfPercForNegativeChanges = { color: '#FF00A3' };
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-100%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#EFF9FF',
  },
};

class Crypt extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      chartData: {},
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
    fetch('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then(result => result.json())
      .then(data => {
        this.setState({ chartData: data.bpi });
      });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
    console.log('Closed modal.');
  }

  render() {
    return (
      <div className="container pt-2" onClick={this.openModal} role="button" tabIndex="0">
        <div className="columns col-oneline">
          <div className="column col-3">
            <div className={`cc  text-right ${this.props.crypt.symbol}`} />
          </div>
          <div className="column">
            <div className="columns text-left">
              <div className="column">
                <b>{this.props.crypt.symbol}</b> | {this.props.crypt.name}
              </div>
              <div className="column">
                <b>${this.props.crypt.price_usd} USD</b>
              </div>
            </div>
            <div className="columns text-left">
              <div className="column">
                <span
                  style={
                    this.props.crypt.percent_change_24h > 0
                      ? stylesOfPercForPositiveChanges
                      : stylesOfPercForNegativeChanges
                  }
                >
                  24h <b>{this.props.crypt.percent_change_24h}%</b>
                </span>
              </div>
              <div className="column">
                <span
                  style={
                    this.props.crypt.percent_change_7d > 0
                      ? stylesOfPercForPositiveChanges
                      : stylesOfPercForNegativeChanges
                  }
                >
                  7d <b>{this.props.crypt.percent_change_7d}%</b>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="divider" />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="container">
            <div className="columns">
              <div className="column col-3">
                <div className={`cc  text-right ${this.props.crypt.symbol}`} />
              </div>
              <div className="column text-center">
                <div className="columns">
                  <div className="column col-12">{this.props.crypt.name}</div>
                  <div className="column col-12">
                    <b>{this.props.crypt.symbol}</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="column text-center py-2 my-2">${this.props.crypt.price_usd} USD</div>
            <AreaChart
              data={this.state.chartData}
              height="175px"
              library={
              {
                layout: {
                  padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  },
                },
                scales: {
                  xAxes: [{
                      gridLines: {
                          display: false,
                          drawBorder: false,
                      },
                  }],
                  yAxes: [{
                      gridLines: {
                          display: false,
                          drawBorder: false,
                      },
                  }],
                },
                legend: {
                  labels: {
                    fontColor: 'white',
                    fontSize: 18,
                  },
                },
              }}
            />
            <div className="column text-center">
              <span
                style={
                  this.props.crypt.percent_change_1h > 0
                    ? stylesOfPercForPositiveChanges
                    : stylesOfPercForNegativeChanges
                  }
              >
              1h <b>{this.props.crypt.percent_change_1h}%</b>
              </span>
            </div>
            <div className="column text-center">
              <span
                style={
                this.props.crypt.percent_change_24h > 0
                  ? stylesOfPercForPositiveChanges
                  : stylesOfPercForNegativeChanges
              }
              >
              24h <b>{this.props.crypt.percent_change_24h}%</b>
              </span>
            </div>
            <div className="column text-center">
              <span
                style={
                this.props.crypt.percent_change_7d > 0
                  ? stylesOfPercForPositiveChanges
                  : stylesOfPercForNegativeChanges
              }
              >
              7d <b>{this.props.crypt.percent_change_7d}%</b>
              </span>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Crypt;
