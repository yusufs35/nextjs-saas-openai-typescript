"use client";
import { profileAtom } from "@/atoms/profile-atom";
import { useRecoilValue } from "recoil";

const Credit = () => {
	const profile = useRecoilValue<any>(profileAtom);

	return <>{profile.credits}</>;
};

export default Credit;
