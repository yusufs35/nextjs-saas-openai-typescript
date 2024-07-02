import { Db, ObjectId } from "mongodb";

export const insertPost = async (db: Db, post: Post) => {
	await db.collection("posts").insertOne(post);
};

export const getPostsByUserId = async (db: Db, id: string | undefined) => {
	return await db
		.collection("posts")
		.find({
			uid: id,
		})
		.toArray();
};

export const deletePostById = async (db: Db, id: string) => {
	await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
};
