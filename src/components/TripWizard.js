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
        flightUpload: null,
        flightCost: 0,
        birthday: 0,
        nationality: '',
        clientSecret: '',

        isSolo: null,
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
        const paymentCost = flightCost / 4
        this.setState({ flightUpload, flightCost, paymentCost });
        this.generatePaymentIntent(paymentCost);
    }

    generatePaymentIntent = async (amount) => {
        const data = await Auth.currentSession()
            .then(data => {
                return data;
            })
            .catch(err => console.log(err));

        let accessToken = data.getAccessToken()
        let jwt = accessToken.getJwtToken()

        fetch("/api/users/payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'flynance-token': jwt
            },
            body: JSON.stringify({
                amount: amount * 100
            })
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({ clientSecret: data.clientSecret });
            });
    }

    handleLocationSubmit = (location) => {
        this.setState({
            travelingTo: location
        });
    }

    handleDateSubmit = (start, end) => {
        this.setState({
            startDate: start,
            endDate: end
        });
    }

    handleSoloSubmit = async (callback) => {
        const data = await Auth.currentSession()
            .then(data => {
                return data;
            })
            .catch(err => console.log(err));

        let accessToken = data.getAccessToken()
        let jwt = accessToken.getJwtToken();

        const { travelingTo, startDate, endDate, nationality, birthday, flightUpload } = this.state;
        const formData = new FormData();
        formData.append('flightUpload', flightUpload, flightUpload.name);
        formData.append('travelingTo', travelingTo);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('birthday', birthday);
        formData.append('nationality', nationality);

        fetch('/api/trips', {
            method: 'POST',
            headers: {
                'flynance-token': jwt,
            },
            body: formData
        })
            .then(response => response.json())
            .then(async data => {
                console.log(data)
            });
    }

    handleGroupSubmit = async (startDate, endDate) => {
        this.setState({ startDate, endDate });
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
                startDate: startDate,
                endDate: endDate
            })
        })
            .then(response => response.json())
            .then(async data => {
                console.log(data)
                window.location.href = '/app/travelers';
            });
    }

    render() {
        const background = window.innerWidth <= 760 ? '' : 'url(' + backgroundImage + ')';
        const { isSolo, clientSecret, paymentCost } = this.state;
        const { user } = this.props;
        let content;

        if (isSolo === null) {
            content = <Step1 setIsSolo={(isSolo) => this.setState({ isSolo })} />;
        } else {
            if (!user) {
                content = <Step2 />;
            } else {
                content = <StepWizard>
                    {isSolo ? <Step2bBirthday handleBirthdaySubmit={this.handleBirthdaySubmit} /> : null}
                    <Step3 handleLocationSubmit={this.handleLocationSubmit} />
                    {isSolo ? <Step4 handleDateSubmit={this.handleDateSubmit} /> :
                        <Step4 handleDateSubmit={this.handleGroupSubmit} handleSubmit={this.handleGroupSubmit} />}
                    {isSolo ? <Step5LinkFlight handleLinkFlightSubmit={this.handleLinkFlightSubmit} /> : null}
                    {isSolo ? <Step6StripePayment paymentCost={paymentCost} clientSecret={clientSecret} handleSoloSubmit={this.handleSoloSubmit} /> : null}
                    {isSolo ? <Step7Complete /> : null}
                </StepWizard>
            }
        }

        return (
            <div className="wizard-wrapper" style={{
                backgroundImage: background,
                backgroundSize: "auto 120%",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '-3% 50%',
                height: "100vh"
            }}>
                <WizardNav startTripWizard={this.startTripWizard} />
                <div className="step-wrapper">
                    {content}
                </div>

            </div>
        )
    }
}

export default TripWizard;
