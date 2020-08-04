import React from 'react';
import StepWizard from 'react-step-wizard';
import history from './history';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import '../css/help.css';
import WizardNav from './WizardNav';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import backgroundImage from '../img/background.png';

import airplane1 from '../img/airplane.png';
import airplane2 from '../img/aircraft.png';
import airplane3 from '../img/blimp.png';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.saveLocation = this.saveLocation.bind(this);
        this.saveDates = this.saveDates.bind(this);
        this.createTrip = this.createTrip.bind(this);
        this.startTripWizard = this.startTripWizard.bind(this);
    }

state = {
        travelingTo: '',
            startDate: null,
        endDate: null,
            step: 1
    }

    startTripWizard() {
        this.setState({
            step: 2
        });
        console.log(this.state.step)
    }

    handleChange(evt) {
  const value = evt.target.value;
  this.setState({
    ...this.state,
    [evt.target.name]: value
  });
}
    saveLocation(location) {
        this.setState({
            travelingTo: location
        });
    }

 saveDates(start, end) {
        this.setState({
            startDate: start,
            endDate: end
        });
 }

    async createTrip(callback) {
        console.log(this.state);
        if(!this.state.startDate || !this.state.endDate) {
            return callback('no dates', null);
        }

        const data = await Auth.currentSession()
                               .then(data => {
                                   return data;
                               })
                               .catch(err => console.log(err));

        let accessToken = data.getAccessToken()
        let jwt = accessToken.getJwtToken()
        fetch('/api/trips', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'flynance-token': jwt
            },
            body: JSON.stringify({
                travelingTo: this.state.travelingTo,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            })
        })
            .then(response => response.json())
            .then(async data => {
                console.log(data)
                await Auth.signOut();
                window.location.href = '/app/travelers';
            });
    }

    render() {
        const background = window.innerWidth <= 760 ? '' : 'url('+ backgroundImage +')';
        return (
            <div class="wizard-wrapper" class="baclground" style={{
                backgroundSize: "auto 120%",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '-4% 70%',
                height: "100%",
            }}>
              <WizardNav startTripWizard={this.startTripWizard} />

              <div class="col-md-6 offset-md-3">


              <div class="background">
                <div class="container">
                <center><h1>Calculator</h1></center>
                <center><p class="pricing-subtext">Can't find your question? Shoot us an email at <b>help@flynanceair.com</b></p></center>
                </div>
                </div>





</div>
</div>



        )
    }
}

export default Calculator;
