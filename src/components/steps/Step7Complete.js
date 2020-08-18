import React from 'react';
import { Alert } from 'react-bootstrap';
import illustration from '../../img/step3.png';

class Step5 extends React.Component {

  render() {
    // const error = this.state.error ? <Alert variant='danger' className="mt-3">There is an error</Alert> : '';
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 offset-md-3 text-center">
            <h1>Your flight has been successfully booked!</h1>
            <p>Wasn't that easy peasy!</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Step5;
