import React from 'react';
import ConfirmEmailModal from './ConfirmEmailModal';
import { Alert } from 'react-bootstrap';
import illustration from '../../img/step2.png';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.confirmEmail = this.confirmEmail.bind(this);
  }

  state = {
    email: '',
    password: '',
    showModal: false,
    code: null,
    error: null
  }

handleChange(evt) {
  const value = evt.target.value;
  this.setState({
    ...this.state,
    [evt.target.name]: value
  });
}
  componentDidUpdate() {
    if(this.props.currentStep === 2 && !this.state.code) {
      Auth.currentSession()
    .then(data => {
      return this.props.goToStep(3);
    })
    .catch(err => console.log(err));
    }
  }

 confirmEmail(event) {
   event.preventDefault();
   Auth.confirmSignUp(this.state.user.user.username, this.state.code)
       .then(result => {
        Auth.signIn(this.state.email, this.state.password)
            .then(result => {
              console.log(result)
Auth.currentSession()
          .then(data => {
            let accessToken = data.getAccessToken()
            let jwt = accessToken.getJwtToken()
            fetch('/api/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'flynance-token': jwt
              },
              body: JSON.stringify({
                cognito_id: result.username,
                email: this.state.email
              })
            })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                this.setState({
                showModal: false,
                code: null
              })
              });

          })
          .catch(err => console.log(err));


            })
            .catch(err => {
              console.log(err);
            });
       })
       .catch(err => {
         console.log(err);
       });

 }

  async handleSubmit(event) {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    this.setState({
        error: null
      })
    try {
      const user = await Auth.signUp({
        username: email,
        email,
        password,
        attributes: {
          email: email
        }
      });
      this.setState({
                  user,
                  showModal: true
                })
    } catch(error) {
      this.setState({
        error: true
      })
      console.log('error signing up:', error);
    }

  }

  render() {
    const error = this.state.error ? <Alert variant='danger' className="mt-3">Please ensure password contains 8+ characters, 1 number, 1 special character, and that the email is not already in use.</Alert> : '';
    return (
       <div class="container-fluid">
         <div class="row">
                <div class="col-md-5 offset-md-1">
                <h1>Just a couple details...</h1>
                <form onSubmit={this.handleSubmit} >
  <div class="form-group">
    <input name="email" type="email" class="form-control step-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="you@email.com" value={this.state.email} onChange={this.handleChange} />
  </div>
  <div class="form-group">
    <input name="password" type="password" class="form-control step-input" id="exampleInputPassword1" placeholder="password" value={this.state.password} onChange={this.handleChange} />
  </div>
                <button type="submit" class="btn btn-primary-rounded">Signup</button>
                  {error}
</form>
      <ConfirmEmailModal show={this.state.showModal} confirmEmail={this.confirmEmail} handleChange={this.handleChange} />
            </div>
                <div class="col-md-5">
                <img class="illustration" src={illustration} />
            </div>
            </div>
       </div>
        )
    }
}

export default Step2;
