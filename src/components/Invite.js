import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { Redirect } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

class Invite extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: true
        }
    }

    componentDidMount() {
      const inviteCode =  this.props.match.params.inviteCode;
      Auth.currentAuthenticatedUser()
          .then(user => {
            console.log(user);
            Auth.currentSession()
          .then(data => {
            console.log('data', data)
            let accessToken = data.getAccessToken()
            let jwt = accessToken.getJwtToken() 
            fetch('/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'flynance-token': jwt 
              },
              body: JSON.stringify({
                cognito_id: user.username,
                email: user.attributes.email,
                invite_code: inviteCode,
                birthday: user.attributes['custom:birthday'],
                passport_nationality: user.attributes['custom:passport_nationality']
              })
            })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                this.setState({
                show: false,
              })
                this.props.history.push('/app/travelers');
              })
              .catch((err) => {
                console.log('error creating flynance user', err)
              });

          })
          .catch(err => console.log(err));
          })
          .catch(err => {
            console.log(err)
          })
    }

    render() {
        return (
            <Modal
              show={this.state.show}
              backdrop="static"
              keyboard={false}
            >
        
        <Modal.Body className="text-center"><FontAwesomeIcon icon={faCircleNotch} size="2x" spin/></Modal.Body>
        
      </Modal>
        )
    }
}

export default Invite;
