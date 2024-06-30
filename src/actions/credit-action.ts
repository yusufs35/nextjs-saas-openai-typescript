"use server";

import { auth } from "@/auth";
import { connectToDB } from "@/lib/mongo";
import { Document, WithId } from "mongodb";
import { Session, User } from "next-auth";

export const addCredits = async () => {
	const { db } = await connectToDB();

	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	if (!user) throw new Error("User is not authenticated");

	await db.collection("profiles").updateOne(
		{ uid: user.id },
		{
			$inc: {
				credits: 10,
			},
		}
	);
};
