"use client";
import { addCredits } from "@/actions/credit-action";
import React from "react";

const BuyMoreCreditButton = () => {
	const addCredit = async () => {
		await addCredits();
	};
	return (
		<button
			className="bg-indigo-600 text-white px-4 py-2 my-2 rounded-md font-bold text-xl"
			onClick={addCredit}
		>
			Buy more credits
		</button>
	);
};

export default BuyMoreCreditButton;
