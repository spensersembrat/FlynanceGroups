import React from 'react';
import StepWizard from 'react-step-wizard';
import history from './history';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import '../css/steps.css';
import WizardNav from './WizardNav';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step2bBirthday from './steps/Step2bBirthday';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5LinkFlight from './steps/Step5LinkFlight';
import Step6StripePayment from './steps/Step6StripePayment';
import Step7Complete from './steps/Step7Complete';
import backgroundImage from '../img/background.png';

class TripWizard extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.startTripWizard = this.startTripWizard.bind(this);
    }

    state = {
        travelingTo: '',
        startDate: null,
        endDate: null,
        step: 1,
        flightUpload: null,
        flightCost: 0,
        birthday: 0,
        nationality: '',

        isSolo: false,
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

    handleBirthdaySubmit = ({ birthday, nationality }) => {
        this.setState({ birthday, nationality });
    }

    handleLinkFlightSubmit = ({ flightUpload, flightCost }) => {
        this.setState({ flightUpload, flightCost });
    }

    handleLocationSubmit = (location) => {
        this.setState({
            travelingTo: location
        });
    }

    handleDateChanged = (start, end) => {
        this.setState({
            startDate: start,
            endDate: end
        });
    }

    handleGroupSubmit = async (callback) => {
        console.log(this.state);
        if (!this.state.startDate || !this.state.endDate) {
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
        const background = window.innerWidth <= 760 ? '' : 'url(' + backgroundImage + ')';
        const { isSolo } = this.state;

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
                        {this.state.step === 1 ? <Step1 setIsSolo={(isSolo) => this.setState({ isSolo })} /> : ''}
                        <Step2 />
                        {isSolo ? <Step2bBirthday handleBirthdaySubmit={this.handleBirthdaySubmit} /> : null}
                        <Step3 handleLocationSubmit={this.handleLocationSubmit} />
                        {isSolo ? <Step4 handleDateChanged={this.handleDateChanged} /> :
                            <Step4 handleDateChanged={this.handleDateChanged} handleSubmit={this.handleGroupSubmit} />}
                        {isSolo ? <Step5LinkFlight handleLinkFlightSubmit={this.handleLinkFlightSubmit} /> : null}
                        {isSolo ? <Step6StripePayment /> : null}
                        {isSolo ? <Step7Complete /> : null}
                    </StepWizard>
                </div>

            </div>
        )
    }
}

export default TripWizard;
