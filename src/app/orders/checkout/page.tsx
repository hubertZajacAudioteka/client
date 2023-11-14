'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { RootState } from '@/store';
import { useFetchSecretKeyMutation } from '@/store/apis/orderApi';
import CheckoutForm from '@/components/order/CheckoutForm';

const CheckoutOrderPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchClientSecret] = useFetchSecretKeyMutation();

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
    {
      locale: 'en',
    }
  );

  const orderedProducts = useSelector(
    (state: RootState) => state.order.orderedProducts
  );
  const products = orderedProducts.map((product) => {
    return {
      id: product.id,
      quantity: product.quantity,
    };
  });

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  } as StripeElementsOptions;

  useEffect(() => {
    (async () => {
      const res = await fetchClientSecret({ products });
      if ('data' in res) {
        setClientSecret(res.data.clientSecret);
      }
    })();
  }, []);

  return (
    <>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : null}
    </>
  );
};

export default CheckoutOrderPage;
