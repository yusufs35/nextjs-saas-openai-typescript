export const getCreateTitlePrompt = (postPrompt: PostPrompt) => ({
	model: "gpt-3.5-turbo",
	messages: [
		{ role: "system", content: "You are a blog post writer" },
		{
			role: "user",
			content: `Write me a title for a blog post about ${
				postPrompt.description
			}. The keywords for the post are as follows: ${
				postPrompt.keywords
			}. The tone of the post should be ${
				postPrompt.tone
			}. The title should be SEO friendly and no longer than 15 words. Write only one title. ${
				postPrompt.title.length > 0
					? `Take that title into consideration: ${postPrompt.title}.`
					: ""
			}. Do not wrap the title in quotes. `,
		},
	],
	temperature: 0.2,
});
