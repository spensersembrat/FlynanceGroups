import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

const stripe_pk = process.env.REACT_APP_STRIPE_PK;
const promise = loadStripe(stripe_pk);

class Step6 extends React.Component {
    handleSuccess = () => {
        this.props.handleSoloSubmit();
        this.props.nextStep();
    }

    render() {
        const { clientSecret, nextStep, paymentCost } = this.props;
        // const error = this.state.error ? <Alert variant='danger' className="mt-3">There is an error</Alert> : '';
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-5 offset-md-1">
                        <h1>Complete your first payment to book your flight</h1>
                        <p>Secure payment with Stripe</p>
                    </div>
                    <div class="col-md-5">
                        <Elements stripe={promise}>
                            <CheckoutForm paymentCost={paymentCost} clientSecret={clientSecret} handleSuccess={this.handleSuccess}/>
                        </Elements>
                    </div>
                </div>
            </div>
        )
    }
}

export default Step6;
