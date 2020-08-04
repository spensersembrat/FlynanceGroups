import React from 'react';
import StepWizard from 'react-step-wizard';
import history from './history';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import '../css/steps-pricing.css';
import '../css/pricing.css';
import WizardNav from './WizardNav';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import backgroundImage from '../img/background.png';

import airplane1 from '../img/airplane.png';
import airplane2 from '../img/aircraft.png';
import airplane3 from '../img/blimp.png';

class Pricing extends React.Component {
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
                backgroundPosition: '-8% 70%',
                height: "100%"
            }}>
              <WizardNav startTripWizard={this.startTripWizard} />

              <div class="background">
                <div class="container">
                <center><h1>Pricing</h1></center>
                <center><p class="pricing-subtext">Choose a plan that fits your group - 100% free to create trips, invite members and structure your itinerary.</p></center>
                  <div class="panel pricing-table">

                    <div class="pricing-plan">
                      <img src={airplane1} alt="" class="pricing-img"></img>
                      <span class="pricing-price">25% DOWN</span>
                      <span class="pricing-price-servicefee">+ 15% service fee</span>
                      <ul class="pricing-features">
                        <li class="pricing-features-item">Up to <b>5 travelers</b></li>
                        <li class="pricing-features-item">Free until booking</li>
                        <li class="pricing-features-item">Interactive Itinerary</li>
                        <li class="pricing-features-item">The zero price hikes <u>guarentee</u></li>
                        <li class="pricing-features-item">24/7 pre-trip support</li>
                        <li class="pricing-features-item"><u>Flynance Payment Plan</u> for every traveler</li>
                      </ul>

                      <a href="/" class="pricing-button is-featured">Create Trip</a>
                    </div>

                    <div class="pricing-plan">
                      <img src={airplane2} alt="" class="pricing-img"></img>
                      <span class="pricing-price">40% DOWN</span>
                      <span class="pricing-price-servicefee">+ 9% service fee</span>
                      <ul class="pricing-features">
                        <li class="pricing-features-item">Up to <b>12 travelers</b></li>
                        <li class="pricing-features-item">Free until booking</li>
                        <li class="pricing-features-item">Interactive Itinerary</li>
                        <li class="pricing-features-item">$100 future booking credit per traveler</li>
                        <li class="pricing-features-item">The zero price hikes <u>guarentee</u></li>
                        <li class="pricing-features-item">24/7 pre-trip support</li>
                        <li class="pricing-features-item"><u>Flynance Payment Plan</u> for every traveler</li>
                      </ul>

                      <a href="/" class="pricing-button is-featured">Create Trip</a>
                    </div>

                    <div class="pricing-plan">
                      <img src={airplane3} alt="" class="pricing-img"></img>
                      <span class="pricing-price">CUSTOM</span>
                      <span class="pricing-price-servicefee">for 12+ travelers</span>
                      <ul class="pricing-features">
                        <li class="pricing-features-item">More than <b>12 travelers</b></li>
                        <li class="pricing-features-item">Group flight ticket discounts</li>
                        <li class="pricing-features-item">Free until booking</li>
                        <li class="pricing-features-item">Interactive Itinerary</li>
                        <li class="pricing-features-item">$100 future booking credit per traveler</li>
                        <li class="pricing-features-item">The zero price hikes <u>guarentee</u></li>
                        <li class="pricing-features-item">24/7 pre-trip support</li>
                        <li class="pricing-features-item"><u>Flynance Payment Plan</u> for every traveler</li>
                      </ul>

                      <a href="#/" class="pricing-button">Contact Us</a>
                    </div>

                  </div>
                </div>
              </div>

              </div>

        )
    }
}

export default Pricing;
