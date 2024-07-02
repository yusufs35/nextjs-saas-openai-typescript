import { Db } from "mongodb";

export const getProfileById = async (db: Db, id: string | undefined) => {
	return await db.collection("profiles").findOne({ uid: id });
};

export const updateCredit = async (
	db: Db,
	userId: string | undefined,
	updatedAmount: number
) => {
	return await db.collection("profile").findOneAndUpdate(
		{
			uid: userId,
		},
		{
			$inc: {
				credits: updatedAmount,
			},
		},
		{ returnDocument: "after" }
	);
};

export const createProfile = async (db: Db, profile: ProfileReturnType) => {
	await db.collection("profiles").insertOne(profile);
};
