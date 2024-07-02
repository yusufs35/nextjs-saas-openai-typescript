"use server";

import { auth } from "@/auth";
import { connectToDB } from "@/lib/mongo";
import { createProfile, getProfileById } from "@/lib/mongo/profile";
import { Session, User } from "next-auth";



export const getProfile = async () => {
	const { db } = await connectToDB();

	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	if (!user) throw new Error("User is not authenticated");

	let profile: ProfileReturnType = await getProfileById(db, user.id);

	if (!profile) {
		profile = {
			uid: user.id,
			credits: 0,
		};
		await createProfile(db, profile);
	}

	return JSON.stringify(profile);
};
