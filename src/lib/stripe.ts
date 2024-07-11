import Stripe from "stripe";

export const createStripeObject = () => {
	return new Stripe(process.env.STRIPE_SECRET_KEY!, {
		apiVersion: "2023-10-16",
	});
};
