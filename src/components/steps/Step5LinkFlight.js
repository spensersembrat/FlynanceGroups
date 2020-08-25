import React from 'react';
import illustration from '../../img/step3.png';
import { Alert } from 'react-bootstrap';

class Step5 extends React.Component {
  state = {
    flightUpload: null,
    flightCost: null,
    paymentPlan: '25', // either 25 or 40
    error: null,
  }

  ALLOWED_FILE_TYPES = ['pdf', 'jpg', 'jpeg', 'png'];

  handleUploadChange = (e) => {
    const flightUpload = e.target.files[0];
    const nameArray = flightUpload.name.split('.');
    const ext = nameArray[nameArray.length - 1];
    const isValidFileType = this.ALLOWED_FILE_TYPES.includes(ext);
    const isValidFileSize = flightUpload.size / 1024 / 1024 < 2;
    if (isValidFileSize && isValidFileType) {
      this.setState({ flightUpload, error: null });
    } else {
      this.setState({ error: 'File is too large or not an image or pdf' });
    }
  }

  handleCostChange = (e) => {
    const flightCost = parseFloat(e.target.value).toFixed(2);
    this.setState({ flightCost });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { flightUpload, flightCost, paymentPlan } = this.state;

    if (flightCost === null || flightUpload === null) {
      this.setState({ error: 'Please fill in all fields!' });
      return;
    }

    this.props.handleLinkFlightSubmit({
      flightUpload,
      flightCost,
      paymentPlan
    });
    this.props.nextStep();
  }

  render() {
    const { error } = this.state;
    const errorContent = error ? <Alert variant='danger' className="mt-3">{error}</Alert> : '';
    const { flightUpload, paymentPlan } = this.state;
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-5 offset-md-1">
            <h1>Link your Flight</h1>
            <p>View how to connect your flight here</p>
            <form onSubmit={this.handleSubmit} >
              <div class="form-group">
                <label htmlFor="file-upload" class="mb-0 btn btn-secondary">
                  {flightUpload ? `${flightUpload.name} Uploaded` : 'Upload'}
                </label>
                <input id="file-upload" type="file" name="flightUpload" accept=".png,.jpg,.jpeg,.pdf" onChange={this.handleUploadChange} />
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

              <div className="form-group">
                <div className="payment-plan-container d-flex flex-row">
                  <div className={`payment-plan-options ${paymentPlan === '25' && 'selected'}`} onClick={() => {
                    this.setState({ paymentPlan: '25' });
                  }}>
                    <h3>25%</h3>
                    <p>with 15% service fee</p>
                  </div>
                  <div className={`payment-plan-options ${paymentPlan === '40' && 'selected'}`} onClick={() => {
                    this.setState({ paymentPlan: '40' });
                  }}>
                    <h3>40%</h3>
                    <p>with 9% service fee</p>
                  </div>
                </div>
              </div>
              <button class="btn btn-primary-rounded">Continue</button>
              {errorContent}
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
