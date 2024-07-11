import { connectToDB } from "@/lib/mongo";
import { updateCredit } from "@/lib/mongo/profile";
import { createStripeObject } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = createStripeObject();
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const body = await req.text();
		const sig = req.headers.get("stripe-signature");

		let event: Stripe.Event;
		try {
			event = stripe.webhooks.constructEvent(body, sig!, webhookSecret!);
		} catch (err) {
			return NextResponse.error();
		}

		// Handle the event
		console.log(event.type);
		if (event.type === "payment_intent.succeeded") {
			console.log("OK");
			const paymentIntent = event.data.object as Stripe.PaymentIntent;
			const userId = paymentIntent.metadata.uid;

			console.log("userId:", userId);

			const { db } = await connectToDB();
			updateCredit(db, userId, 10);
		} else {
			console.log(`Unhandled stripe event: ${event.type} `);
		}

		return NextResponse.json({ message: "success" }, { status: 200 });
	} catch (err) {
		return NextResponse.error();
	}
}
