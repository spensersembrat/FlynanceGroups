import React from 'react';
import illustration from '../../img/step3.png';
import { Alert } from 'react-bootstrap';

class Step5 extends React.Component {
  state = {
    flightUpload: null,
    flightCost: null,
    error: null,
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
    
    if (flightCost === null || flightUpload === null) {
      this.setState({ error: true });
      return;
    }

    this.props.handleLinkFlightSubmit({
      flightUpload,
      flightCost
    });
    this.props.nextStep();
  }

  render() {
    const error = this.state.error ? <Alert variant='danger' className="mt-3">Please fill in all fields!</Alert> : '';
    const { flightUpload } = this.state;
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-5 offset-md-1">
            <h1>Link your Flight</h1>
            <p>View how to connect your flight here</p>
            <form onSubmit={this.handleSubmit} >
              <div class="form-group">
                <label htmlFor="file-upload" class="btn btn-secondary">
                  { flightUpload ? `${flightUpload.name} Uploaded` : 'Upload' }
                </label>
                <input id="file-upload" type="file" name="flightUpload" onChange={this.handleUploadChange} />
              </div>
              <div class="form-group">
                <input
                  type="number"
                  class="form-control step-input"
                  name="flightCost"
                  placeholder="Flight Cost"
                  step="0.01"
                  onChange={this.handleCostChange}
                />
              </div>
              <button class="btn btn-primary-rounded">Continue</button>
              { error }
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
