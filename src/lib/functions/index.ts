export const generatePost = (postPrompt: PostPrompt) => {
	return fetch(`${process.env.API_BASE_URL}/posts/new`, {
		method: "post",
		body: JSON.stringify(postPrompt),
		headers: {
			"Content-Type": "application/json",
		},
	});
};

export const getPosts = () => {
	return fetch(`${process.env.API_BASE_URL}/posts/list`);
};
