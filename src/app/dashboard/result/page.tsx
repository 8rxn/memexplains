import type { Stripe } from "stripe";

import PrintObject from "@/components/PrintObject";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const increment =
    (Number(
      checkoutSession.amount_total && checkoutSession.amount_total / 100
    ) /
      87.5) *
    2;

  const updateCredits = await prisma.user.update({
    where: { email: `${checkoutSession.customer_details?.email}` },
    data: {
      credits: { increment: increment },
    },
  });

  if (updateCredits) {
    return redirect("/");
  }

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;

  return (
    <>
      <h2>Status: {paymentIntent.status}</h2>
      <h2>Reloading...</h2>
      <h3>Checkout Session response:</h3>

      <PrintObject content={checkoutSession} />
    </>
  );
}
