import React from 'react';
import history from './history';
import Amplify, { Auth } from 'aws-amplify';
import '../css/bookbutton.css';

class InviteModal extends React.Component {
  constructor(props) {
    super(props);
    this.inviteUser = this.inviteUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    name: '',
    email: ''
  }

handleChange(evt) {
  const value = evt.target.value;
  this.setState({
    ...this.state,
    [evt.target.name]: value
  });
}

  inviteUser(event) {
    event.preventDefault();

    Auth.currentSession()
        .then(data => {
          console.log('data', data)
          let accessToken = data.getAccessToken()
          let jwt = accessToken.getJwtToken()
          fetch('/api/invites', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'flynance-token': jwt
            },
            body: JSON.stringify({
              name: this.state.name,
              email: this.state.email
            })
          })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              window.location.reload();
            })
            .catch((err) => {
              console.log('error creating flynance invite', err)
            });
        });
  }
    render() {
        return (
            <React.Fragment>
            <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#exampleModal">
              Invite New
            </button>

<button className="bookflightbutton" type="button" disabled class="btn btn-outline-secondary" data-toggle="modal" data-target="#exampleModal">
  Book Flights
</button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Invite Trip Member</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="text-center" onSubmit={this.inviteUser}>
  <div class="form-group">
          <input name="name" type="text" class="form-control invite-modal-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Full Name" onChange={this.handleChange} />
  </div>
  <div class="form-group">
    <input name="email" type="email" class="form-control invite-modal-input" id="exampleInputPassword1" placeholder="Email" onChange={this.handleChange} />
  </div>

  <button type="submit" class="btn btn-secondary">Submit</button>
</form>
      </div>
    </div>
  </div>
</div>
</React.Fragment>
        )
    }
}

export default InviteModal;
