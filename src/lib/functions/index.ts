export const generatePost = async (postPrompt: PostPrompt) =>
	await fetch("/api/posts/generatePost", {
		method: "post",
		body: JSON.stringify(postPrompt),
		headers: {
			"Content-Type": "application/json",
		},
	});
