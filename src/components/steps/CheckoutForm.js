import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ clientSecret, handleSuccess, paymentCost }) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    
  }, []);
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value
        }
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      handleSuccess();
    }
  };

  const finalPaymentCost = parseFloat(paymentCost).toFixed(2);
  const isBelowStripeThreshold = finalPaymentCost < 0.5;
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      </div>
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
        className="btn btn-primary btn-block"
      >
        <span id="button-text">
          {processing ? (
            'Processing...'
          ) : (
              `Pay $${isBelowStripeThreshold ? `0.50 ` : finalPaymentCost}`
            )}
        </span>
      </button>
          { isBelowStripeThreshold && <div>Stripe's minimum charge amount is 50 cents</div> }
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}