"use server";

import type { Stripe } from "stripe";

import { headers } from "next/headers";



import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(data: {
  amount: string;
}): Promise<{ client_secret: string | null; url: string | null }> {
  const ui_mode = "hosted" as Stripe.Checkout.SessionCreateParams.UiMode;

  console.log("data", data.amount);

  const origin: string = headers().get("origin") as string;

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "donate",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "inr",
            product_data: {
              name: "Custom Amount Credits",
            },
            unit_amount: convertUSDtoINR(Number(data.amount) * 100),
          },
        },
      ],
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/dashboard/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/dashboard`,
      }),
      ui_mode,
    });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

function convertUSDtoINR(amount: number): number {
  return amount * 87.5;
}
