"use client";
import { getProfile } from "@/actions/profile-action";
import { profileAtom } from "@/atoms/profile-atom";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

const Credit = () => {
	const [profile, setProfile] = useRecoilState<any>(profileAtom);

	useEffect(() => {
		(async () => {
			const profile = await getProfile();
			setProfile(JSON.parse(profile));
		})();
	}, []);

	return <>{profile.credits}</>;
};

export default Credit;
