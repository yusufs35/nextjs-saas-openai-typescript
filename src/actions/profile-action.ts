"use server";

import { auth } from "@/auth";
import { connectToDB } from "@/lib/mongo";
import { Document, WithId } from "mongodb";
import { Session, User } from "next-auth";

export const getProfile = async () => {
	const { db } = await connectToDB();

	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	if (!user) throw new Error("User is not authenticated");

	let profile: WithId<Document> | Object | null = await db
		.collection("profiles")
		.findOne({
			uid: user?.id,
		});

        console.log(profile)

	if (!profile) {
		profile = {
			uid: user.id,
			credits: 0,
		};
		await db.collection("profiles").insertOne(profile);
	}

	return JSON.stringify(profile);
};
