import { getCreatePostPrompt } from "@/lib/prompts/post";
import { getCreateTitlePrompt } from "@/lib/prompts/title";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const POST = async (request: NextRequest, response: NextResponse) => {
	const { user } = (await getSession(request, response)) || {};

	try {
		const body = await request.json();

		const openAI = new OpenAI({
			apiKey: import.meta.env.OPEN_AI_KEY,
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
		const paragraphs = generatedPost?.split("\n");

		const post: Post = {
			title: generatedTitle || "No title generated",
			content: paragraphs || ["No content generated"],
			uid: user.sub
		}



		return NextResponse.json({});
	} catch (err) {
		return NextResponse.error();
	}
};
