"use client";
import { profileAtom } from "@/atoms/profile-atom";
import React from "react";
import { useRecoilValue } from "recoil";

const Credit = () => {
	const profile = useRecoilValue(profileAtom);
	return <>{profile.credits}</>;
};

export default Credit;
