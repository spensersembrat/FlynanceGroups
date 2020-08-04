import React from 'react';
import { Table, Badge } from 'react-bootstrap';
import '../css/travelers.css';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import InviteModal from './InviteModal';
import { listTravelers } from '../graphql/queries';
import Moment from 'react-moment';

class Travelers extends React.Component {

    constructor(props) {
        super(props)
        this.fetchTravelers = this.fetchTravelers.bind(this);
    }

    state = {
      travelers: [],
      email: '',
      trip: {
        
      }
    }

    async fetchTravelers() {
      Auth.currentSession()
    .then(data => {
     let accessToken = data.getAccessToken()
                let jwt = accessToken.getJwtToken() 
fetch('/api/users', {
  headers: {
    'Content-Type': 'application/json',
        'flynance-token': jwt
  }
})
      .then(response => response.json())
      .then(data => {
        console.log(data)
fetch('/api/trips', {
  headers: {
    'Content-Type': 'application/json',
        'flynance-token': jwt
  }
})
      .then(response => response.json())
      .then(tripData => {
        console.log(tripData)
        this.setState({
          travelers: data.users,
          trip: tripData
        })
      });
        
      });

    })
    .catch(err => console.log(err));
    
  }

   async componentDidMount() {
        this.fetchTravelers()

let user = await Auth.currentAuthenticatedUser();

      const { attributes } = user; 

      this.setState({
        email: attributes.email
      })
    }

    render() {
        const travelers = this.state.travelers.map((traveler) => {
            return (
                    <tr className="text-center">
                    <td>{traveler.full_name}</td>
                      <td>{traveler.email} {this.state.email === traveler.email ? '(YOU)' : ''}</td>
                      <td><Badge variant={traveler.role === 'owner' ? 'success' : 'secondary'}>{traveler.role}</Badge></td>
              <td><Moment format="MM/DD/YYYY">{traveler.created}</Moment></td>
                    <td>{traveler.payments || 0}</td>
                    </tr>
            )
        });

      const showTravelers = travelers.length > 0 ? travelers : (
        <tr>
          <td colspan="5" className="text-center p-5">No Travelers</td>
        </tr>
      )

      const confirmed = this.state.travelers.length > 1 ? this.state.travelers.length - 1 : 0; 
      return (
        <div class="container-fluid">
          <h1>Travelers</h1>
          <br/>
          <div class="card overflow-auto" style={{maxHeight: '500px'}}>
            <div class="card-header bg-white">
              <div class="row">
                <div class="col-md-6">
                  {this.state.trip.traveling_to} - Travelers ({confirmed} Confirmed - {this.state.trip.invites} Invited)
                </div>
                <div class="col-md-6 d-flex flex-row-reverse">
                  <InviteModal /> 
                </div>
              </div>
              
            </div>
            <Table hover>
              <thead>
                <tr className="text-center">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Date Modified</th>
                  <th>Payments</th>
                </tr>
              </thead>
              {showTravelers}
            </Table>
          </div>
          
        </div>
      )
    }
}

export default Travelers;
