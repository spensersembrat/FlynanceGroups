import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import history from './components/history';
import logo from './logo.svg';
import './App.css';
import TripWizard from './components/TripWizard';
import Pricing from './components/Pricing';
import Help from './components/Help';
import Product from './components/Product';
import Dashboard from './components/Dashboard';
import Calculator from './components/Calculator';

import Amplify, { Auth, Hub } from 'aws-amplify';
import { Row, Col, Container } from 'react-bootstrap';
import { AmplifyAuthenticator, withAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  const [user, updateUser] = React.useState(null);
  React.useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => updateUser(user))
      .catch(() => console.log('No signed in user.'));
    Hub.listen('auth', data => {
      switch (data.payload.event) {
        case 'signIn':
          return updateUser(data.payload.data);
        case 'signOut':
          return updateUser(null);
      }
    });
  }, []);

  const flynanceApp = user ? (
    <Dashboard />
  ) : (
      <Container>
        <Row>
          <Col className="d-flex justify-content-center">
            <AmplifyAuthenticator usernameAlias="email" initialAuthState={window.location.pathname.search('invite') > -1 ? 'signup' : 'signin'}>
              <AmplifySignUp
                slot="sign-up"
                usernameAlias="email"
                formFields={[
                  {
                    type: "email",
                    label: "Email",
                    placeholder: "Email",
                    required: true,
                  },
                  {
                    type: "password",
                    label: "Password",
                    placeholder: "Password",
                    required: true,
                  },
                  {
                    type: "custom:birthday",
                    label: "Birthday",
                    placeholder: "MM/DD/YYYY",
                    required: true,
                  },
                  {
                    type: "custom:passport_nationality",
                    label: "Passport Nationality",
                    placeholder: "Passport Nationality",
                    required: true,
                  },
                ]}
              />
              <AmplifySignIn slot="sign-in" usernameAlias="email" />
            </AmplifyAuthenticator>
          </Col>
        </Row>
      </Container>

    );
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={() => <TripWizard user={user} />} />
        <Route path="/Pricing" component={Pricing} />
        <Route path="/Help" component={Help} />
        <Route path="/Product" component={Product} />
        <Route path='/Calculator' component={Calculator} />
        <Route path="/app">
          {flynanceApp}
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
