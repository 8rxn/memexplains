import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function Home() {
  const handleClick = async (event) => {
    const stripe = await stripePromise;

    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: "price_12345", quantity: 1 }],
      successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin,
    });

    if (error) {
      console.warn("Error:", error);
    }
  };

  return <button onClick={handleClick}>Checkout</button>;
}
