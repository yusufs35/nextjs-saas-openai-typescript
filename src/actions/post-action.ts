"use server";

import { auth } from "@/auth";
import { Session, User } from "next-auth";
import { connectToDB } from "@/lib/mongo";
import OpenAI from "openai";
import { getCreateTitlePrompt } from "@/lib/prompts/title";
import { getCreatePostPrompt } from "@/lib/prompts/post";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const getPosts = async () => {
	const { db } = await connectToDB();

	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	if (!user) throw new Error("User is not authenticated");

	const posts = await db
		.collection("posts")
		.find({
			uid: user?.id,
		})
		.toArray();

	return posts;
};

export const generatePost = async (postPrompt: PostPrompt) => {
	const { db } = await connectToDB();

	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	if (!user) throw new Error("User is not authenticated");

	const openAI = new OpenAI({
		apiKey: process.env.OPEN_AI_KEY,
	});

	const createTitlePrompt: ChatGptPrompt = getCreateTitlePrompt(postPrompt);
	const resGeneratedTitle = await openAI.chat.completions.create(
		createTitlePrompt
	);
	const generatedTitle = resGeneratedTitle.choices[0]?.message?.content;

	const createPostPrompt: ChatGptPrompt = getCreatePostPrompt({
		...postPrompt,
		title: generatedTitle ?? "",
	});
	const resGeneratedPost = await openAI.chat.completions.create(
		createPostPrompt
	);
	const generatedPost = resGeneratedPost.choices[0]?.message?.content;

	let paragraphs = generatedPost?.split("\n");
	paragraphs = paragraphs?.filter((item) => item);

	const post: Post = {
		title: generatedTitle ?? "No title generated",
		content: paragraphs ?? ["No content generated"],
		uid: user?.id,
	};

	await db.collection("posts").insertOne(post);

	return post;
};

export const deletePost = async (id: string) => {
	const { db } = await connectToDB();
	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	if (!user) throw new Error("User is not authenticated");
	await db.collection("posts").deleteOne({ _id: new ObjectId(id) });

	revalidatePath("/posts")
};
