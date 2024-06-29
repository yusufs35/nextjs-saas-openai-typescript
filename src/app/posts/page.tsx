
import { getPosts } from "@/actions/post-action";
import React from "react";

const PostPage = async () => {
	const posts = await getPosts();

	console.log(posts)

	return <>Hellox</>;
};

export default PostPage;
