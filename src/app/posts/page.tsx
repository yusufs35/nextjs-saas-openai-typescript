
import { getPosts } from "@/lib/functions";
import React from "react";

const PostPage = async () => {
	const res = await getPosts();
	const data = await res.json();

	console.log(data)

	return <>Hellox</>;
};

export default PostPage;
