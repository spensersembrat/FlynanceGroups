import React from 'react';
import StepWizard from 'react-step-wizard';
import history from './history';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import '../css/product.css';
import WizardNav from './WizardNav';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import backgroundImage from '../img/background.png';
import Image1 from '../img/Image1.png';
import ProductImage1 from '../img/ProductImage1.png';
import ProductImage2 from '../img/ProductImage2.png';
import ProductImage3 from '../img/ProductImage3.png';


class Product extends React.Component {
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
                backgroundSize: "auto 120%",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '-8% 70%',
                height: "100%"
            }}>
              <WizardNav startTripWizard={this.startTripWizard} />

              <div class="background">
                <div class="container">
                <center><h1>Product Features</h1></center>
                <body>
                <section>
                  <div class="container">
                    <div class="col-md-12 col-lg-12 col-sm-12 col-12 project_feature">
                      <div class="col-md-7 col-lg-7 col-sm-7 col-12 wrap1">
                        <img src={ProductImage1} class="productImage" alt="image"></img>
                      </div>

                      <div class="col-md-5 col-lg-5 col-sm-5 col-12 wrap1">
                        <h2>Invite and manage<br/>
                        group travelers</h2>
                        <p>Effortlessly invite group members, track payments and manage your itinerary all from one dashboard.</p>
                      </div>

                    </div>

                    <div class="col-md-12 col-lg-12 col-sm-12 col-12 project_feature">
                      <div class="col-md-7 col-lg-7 col-sm-7 col-12 wrap1 mobile_view">
                        <img src={ProductImage2} class="productImage" alt="image"></img>
                      </div>

                      <div class="col-md-5 col-lg-5 col-sm-5 col-12 wrap1">
                        <h2>Responsive Itinerary<br/>
                        </h2>
                        <p>Every plan includes a responsive itinerary that auto populates with your flight information for all of your group to view. The Group Leader can also add additional events so everyone's on the same page.</p>
                      </div>

                      <div class="col-md-7 col-lg-7 col-sm-7 col-12 wrap1 web_view">
                        <img src={ProductImage2} class="productImage" alt="image"></img>
                      </div>
                    </div>


                    <div class="col-md-12 col-lg-12 col-sm-12 col-12 project_feature">
                      <div class="col-md-7 col-lg-7 col-sm-7 col-12 wrap1">
                        <img src={ProductImage3} class="wrap_image" alt="image"></img>
                      </div>

                      <div class="col-md-5 col-lg-5 col-sm-5 col-12 wrap1">
                        <h2>Backed with the<br/>
                        Flynance Payment Plan</h2>
                        <p>Book your flight for 25% down and make smaller payments before departure. No credit checks.</p>
                      </div>

                    </div>

                  </div>
                </section>
                </body>





                </div>
              </div>

              </div>

        )
    }
}

export default Product;
