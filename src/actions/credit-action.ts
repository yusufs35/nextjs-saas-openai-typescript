"use server";

import { auth } from "@/auth";
import { connectToDB } from "@/lib/mongo";
import { updateCredit } from "@/lib/mongo/profile";
import { Session, User } from "next-auth";

export const addCredits = async () => {
	const { db } = await connectToDB();

	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	if (!user) throw new Error("User is not authenticated");

	const addedCredit: number = 10;

	const result = updateCredit(db, user.id, addedCredit);

	return JSON.stringify(result);
};
