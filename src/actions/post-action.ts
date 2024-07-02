"use server";

import { auth } from "@/auth";
import { Session, User } from "next-auth";
import { connectToDB } from "@/lib/mongo";
import OpenAI from "openai";
import { getCreateTitlePrompt } from "@/lib/prompts/title";
import { getCreatePostPrompt } from "@/lib/prompts/post";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { deletePostById, getPostsByUserId, insertPost } from "@/lib/mongo/post";
import { updateCredit, getProfileById } from "@/lib/mongo/profile";

export const getPosts = async () => {
	const { db } = await connectToDB();

	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	if (!user) throw new Error("User is not authenticated");

	const posts = getPostsByUserId(db, user.id);

	return posts;
};

export const generatePost = async (postPrompt: PostPrompt) => {
	const { db } = await connectToDB();

	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	if (!user) throw new Error("User is not authenticated");

	const profile = await getProfileById(db, user.id);

	if (!profile || profile.credits < 1) throw new Error("Not enough credits");

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

	await insertPost(db, post);

	await updateCredit(db, user.id, -1);

	return post;
};

export const deletePost = async (id: string) => {
	const { db } = await connectToDB();
	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	if (!user) throw new Error("User is not authenticated");
	await deletePostById(db, id);

	revalidatePath("/posts");
};
