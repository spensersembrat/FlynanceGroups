import React from 'react';
import { Alert } from 'react-bootstrap';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import illustration from '../../img/step3.png';
import CheckoutForm from "./CheckoutForm";

const stripe_pk = 'pk_test_51H3NC3LegJFM7u3CW4Q3Z1Spuel0IYsSKcAHYOz8Nx1kmv0iRYIShmbBArJuzTbs7gkMBUmYl8DxpNcDW0OdfbB100uY7f0Lnd';
const promise = loadStripe(stripe_pk);

class Step5 extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
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
                            <CheckoutForm />
                        </Elements>
                    </div>
                </div>
            </div>
        )
    }
}

export default Step5;
