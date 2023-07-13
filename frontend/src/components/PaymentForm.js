import { useState } from 'react';
import axios from 'axios';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export default function PaymentForm() {
  const { state } = useContext(Store);
  const { cart, userInfo } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: '',
      },
      redirect: 'if_required',
    });

    if (error) {
      toast.error(error.message)
      //console.log(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {

      const order = await axios.post(
        '/api/orders/payedOrder',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          isPaid: true,
          paidAt: Date.now(),
          id: paymentIntent.id,
          status: paymentIntent.status,
          email_address: userInfo.email,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: round2(cart.totalPrice),
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      localStorage.removeItem('cartItems');

      if (order) {
        window.location.href = '/';
      }
    }
    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement />

      {isProcessing ? (
        <Button className="w-100 mt-4 p-2" disabled>
          Processing...
        </Button>
      ) : (
        <Button type="submit" className="w-100 mt-4 p-2">
          Pay
        </Button>
      )}
    </form>
  );
}
