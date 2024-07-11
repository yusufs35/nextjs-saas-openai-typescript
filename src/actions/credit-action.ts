"use server";

import { auth } from "@/auth";
import { createStripeObject } from "@/lib/stripe";
import { Session, User } from "next-auth";
import { redirect } from "next/navigation";

const stripe = createStripeObject();

export const addCredits = async () => {
	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	if (!user) throw new Error("User is not authenticated");

	const purchasedItems = [
		{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 },
	];

	const stripeSession = await stripe.checkout.sessions.create({
		mode: "payment",
		line_items: purchasedItems,
		success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
		cancel_url: `${process.env.NEXT_PUBLIC_URL}/profile`,
		payment_intent_data: {
			metadata: {
				uid: user.id!,
			},
		},
		metadata: {
			uid: user.id!,
		},
	});

	redirect(stripeSession.url!);
};
