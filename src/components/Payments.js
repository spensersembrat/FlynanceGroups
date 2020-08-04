import React from 'react';
import { Auth } from 'aws-amplify';
import Moment from 'react-moment';
import '../css/payments.css';

class Payments extends React.Component {
constructor(props) {
        super(props)
        this.fetchTravelerPayments = this.fetchTravelerPayments.bind(this);
    }

    state = {
        travelers: [],
      email: ''
    }
async fetchTravelerPayments() {
      Auth.currentSession()
    .then(data => {
     let accessToken = data.getAccessToken()
                let jwt = accessToken.getJwtToken() 
fetch('/api/users/payments', {
  headers: {
    'Content-Type': 'application/json',
        'flynance-token': jwt
  }
})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({
          travelers: data.users
        })
      });

    })
    .catch(err => console.log(err));
    
  }

  async componentDidMount() {
        this.fetchTravelerPayments()

let user = await Auth.currentAuthenticatedUser();

      const { attributes } = user; 

      this.setState({
        email: attributes.email
      })
    }
  
    render() {
        return (
            <div class="container-fluid">
            <div class="row">
  <div class="col-md-12">
    <h1>Payments</h1>
    <small><Moment format="MM/DD/YYYY">{new Date()}</Moment></small>
  </div>
</div>
<div class="row">
  <div class="col-md-6">
    <div class="payments-container overflow-auto" style={{maxHeight: '500px'}}>
      <table class="table table-borderless text-center ">
        <thead>
        <tr>
          <th scope="col">Traveler</th>
          <th scope="col">Paid</th>
          <th scope="col">Payments</th>
        </tr>
        </thead>
        <tbody>
          {this.state.travelers.map(traveler => (
            <tr>
            <td>{traveler.full_name}</td>
            <td>{traveler.amount_paid || '$0'}</td>
            <td>{traveler.payments || 0}</td>
          </tr>
          ))}
          
        </tbody>
      </table>
    </div>
  </div>
</div>
{/*
  * <div class="row">
  <div class="col-md-12">
    <button class="btn btn-primary-rounded see-all">See All</button>
  </div>
</div>
  */}
</div>
        )
    }
}

export default Payments;
