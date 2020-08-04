import React from 'react';
import StepWizard from 'react-step-wizard';
import history from './history';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import '../css/steps.css';
import WizardNav from './WizardNav';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import backgroundImage from '../img/background.png';

class TripWizard extends React.Component {
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
            <div class="wizard-wrapper" style={{
                backgroundImage: background,
                backgroundSize: "auto 120%",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '-3% 50%',
                height: "100vh"
            }}>
              <WizardNav startTripWizard={this.startTripWizard} />
              <div class="step-wrapper">
                <StepWizard>
                  {this.state.step === 1 ? <Step1 />: ''} 
                <Step2 />
   <Step3 handleChange={this.handleChange} />
            <Step4 saveDates={this.saveDates} createTrip={this.createTrip} />
                </StepWizard>
                </div>

            </div>
        )
    }
}

export default TripWizard;
