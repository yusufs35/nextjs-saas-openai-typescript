import { connectToDB } from "@/lib/mongo";
import { getCreatePostPrompt } from "@/lib/prompts/post";
import { getCreateTitlePrompt } from "@/lib/prompts/title";
import { Auth0Claims } from "@/types/auth0-session";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const POST = withApiAuthRequired(async (req: NextRequest) => {
	const res = new NextResponse();

	const { db } = await connectToDB();

	try {
		const session = await getSession(req, res);
		const user: Auth0Claims | undefined = session?.user;

		const body = await req.json();

		const openAI = new OpenAI({
			apiKey: process.env.OPEN_AI_KEY,
		});

		const createTitlePrompt: ChatGptPrompt = getCreateTitlePrompt(body);
		const resGeneratedTitle = await openAI.chat.completions.create(
			createTitlePrompt
		);
		const generatedTitle = resGeneratedTitle.choices[0]?.message?.content;

		const createPostPrompt: ChatGptPrompt = getCreatePostPrompt({
			...body,
			title: generatedTitle,
		});
		const resGeneratedPost = await openAI.chat.completions.create(
			createPostPrompt
		);
		const generatedPost = resGeneratedPost.choices[0]?.message?.content;

		const paragraphs = generatedPost?.split("---");

		const post: Post = {
			title: generatedTitle ?? "No title generated",
			content: paragraphs ?? ["No content generated"],
			uid: user?.sub,
		};

		await db.collection("posts").insertOne(post);

		return NextResponse.json(post, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.error();
	}
});
