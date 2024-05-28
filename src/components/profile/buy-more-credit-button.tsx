"use client";
import { profileAtom } from "@/atoms/profile-atom";
import React from "react";
import { useRecoilState } from "recoil";

const BuyMoreCreditButton = () => {
	const [profile, setProfile] = useRecoilState(profileAtom);
	const addCredit = () => {
		setProfile((profile) => ({ ...profile, credits: profile.credits + 5 }));
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
