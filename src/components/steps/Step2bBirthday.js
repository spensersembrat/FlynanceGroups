import React from 'react';
import { Alert } from 'react-bootstrap';
import illustration from '../../img/step2.png';

class Step2b extends React.Component {
  state = {
    birthday: 0,
    nationality: '',
    error: null
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { birthday, nationality } = this.state;
    this.props.handleBirthdaySubmit({ birthday, nationality });
    this.props.nextStep();
  }

  render() {
    const { birthday, nationality } = this.state;
    const error = this.state.error ? <Alert variant='danger' className="mt-3">Please try again!</Alert> : '';
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-5 offset-md-1">
            <h1>Just a couple details...</h1>
            <form onSubmit={this.handleSubmit} >
              <div class="form-group">
                <input name="birthday" type="date" class="form-control step-input" placeholder="Birthday" value={birthday} onChange={(e) => {
                  this.setState({ birthday: e.target.value })
                }} />
              </div>
              <div class="form-group">
                <input name="nationality" type="text" class="form-control step-input" placeholder="Passport Nationality" value={nationality} onChange={(e) => {
                  this.setState({ nationality: e.target.value })
                }} />
              </div>
              <button type="submit" class="btn btn-primary-rounded">Continue</button>
              {error}
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

export default Step2b;
