export const getCreatePostPrompt = (postPrompt: PostPrompt) => ({
	model: "gpt-3.5-turbo",
	messages: [
		{ role: "system", content: "You are a blog post writer" },
		{
			role: "user",
			content: `Write me a long and interesting blog post about ${postPrompt.description}. The title of the article is as follows: ${postPrompt.title}. These are the keywords for the post: ${postPrompt.keywords}. The blog post should be long and SEO friendly. The tone of the post should be ${postPrompt.tone}. Write it as well as you can. Do not include the title in the post, just start writing the post. Divide the post into paragraphs and wite at least 3 paragraphs. Distinguish the paragraphs with a line break.`,
		},
	],
	temperature: 0.2,
});
