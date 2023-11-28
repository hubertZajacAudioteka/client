import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { clearOrder } from '@/store/slices/orderSlice';
import { useAddOrderMutation } from '@/store/apis/orderApi';
import { StripePaymentElementOptions } from '@stripe/stripe-js';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import { PAYMENT_FAILURE_URL } from '@/constants/api';

export default function CheckoutForm() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [addOrder] = useAddOrderMutation();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const orderValue = useSelector((state: RootState) => state.order.value);
  const orderedProducts = useSelector(
    (state: RootState) => state.order.orderedProducts
  ).map((product) => ({ id: product.id, quantity: product.quantity }));

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          (async () => {
            await addOrder({ products: orderedProducts });
          })();
          dispatch(clearOrder());
          router.push('/payment/success');
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: PAYMENT_FAILURE_URL!,
      },
    });
    if (
      error &&
      (error.type === 'card_error' || error.type === 'validation_error')
    ) {
      setMessage(error.message as string);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <div className='flex justify-centerl'>
      <form id='payment-form' onSubmit={handleSubmit} className='w-full'>
        <PaymentElement id='payment-element' options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id='submit'>
          <span id='button-text'>
            {isLoading ? (
              <div className='spinner' id='spinner'></div>
            ) : (
              `Pay now ${orderValue.toFixed(2)}`
            )}
          </span>
        </button>
        {message && <div id='payment-message'>{message}</div>}
      </form>
    </div>
  );
}
