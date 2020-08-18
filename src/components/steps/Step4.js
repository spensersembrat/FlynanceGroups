import React from 'react';
import illustration from '../../img/step4.png';
import { RangeDatePicker } from '@y0c/react-datepicker';
import { Alert } from 'react-bootstrap';
// import calendar style
// You can customize style by copying asset folder.
import '@y0c/react-datepicker/assets/styles/calendar.scss';
import moment from 'moment';
import 'moment/locale/en-ca';

class Step4 extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    error: null
  }

  onChange = (start, end) => {
    if (start && end && typeof start.getMonth === 'function' && typeof end.getMonth === 'function') {
      console.log(moment(start), moment(end));
      this.props.handleDateChanged(moment(start.getTime()).valueOf(), moment(end.getTime()).valueOf())
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      error: null
    })
    if (this.props.handleSubmit) {
      this.props.handleSubmit((err, trip) => {
        if (err) {
          return this.setState({
            error: true,
          })
        }
        console.log(trip);
      });
    } else {
      this.props.nextStep();
    }
  }

  render() {
    const error = this.state.error ? <Alert variant='danger' className="mt-3">Sorry, please try again!</Alert> : '';
    return (
      <div class="container-fluid">
        <div class="row min-vh-100">
          <div class="col-md-5 offset-md-1">
            <h1> What days will you be traveling?</h1>
            <form onSubmit={(evt) => evt.preventDefault()}>
              <div class="form-group">
                <RangeDatePicker style={{height: '400px'}} onChange={this.onChange} />
              </div>
              <button type="button" class="btn btn-primary-rounded" onClick={this.handleSubmit}>Begin</button>
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

export default Step4;
