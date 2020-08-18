import React from 'react';
import { Alert } from 'react-bootstrap';
import illustration from '../../img/step3.png';

class Step5 extends React.Component {
  state = {
    flightUpload: null,
    flightCost: 0
  }

  handleUploadChange = (e) => {
    const flightUpload = e.target.files[0];
    this.setState({ flightUpload });
  }

  handleCostChange = (e) => {
    const flightCost = parseFloat(e.target.value).toFixed(2);
    this.setState({ flightCost });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { flightUpload, flightCost } = this.state;
    this.props.handleLinkFlightSubmit({
      flightUpload,
      flightCost
    });
    this.props.nextStep();
  }

  render() {
    const { flightCost } = this.state;
    // const error = this.state.error ? <Alert variant='danger' className="mt-3">There is an error</Alert> : '';
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-5 offset-md-1">
            <h1>Link your Flight</h1>
            <p>View how to connect your flight here</p>
            <form onSubmit={this.handleSubmit} >
              <div class="form-group">
                <label htmlFor="file-upload" class="btn btn-secondary">
                  Upload
                </label>
                <input id="file-upload" type="file" name="flightUpload" onChange={this.handleUploadChange} />
              </div>
              <div class="form-group">
                <input
                  type="number"
                  class="form-control step-input"
                  name="flightCost"
                  placeholder="Flight Cost"
                  value={flightCost}
                  onChange={this.handleCostChange}
                />
              </div>
              <button class="btn btn-primary-rounded">Continue</button>
            </form>
          </div>
          <div class="col-md-5">
            <img class="illustration" src={illustration} />
          </div>
        </div>
      </div>
    )
  }
}

export default Step5;
