import { getPosts } from "@/actions/post-action";
import PostList from "@/components/posts/post-list";
import React from "react";

const PostPage = async () => {
	const posts = await getPosts();

	return (
		<>
			{posts.length <= 0 && (
				<h1 className="text-2xl font-bold text-center text-gray-500">
					You have no posts yet!
				</h1>
			)}

			<PostList posts={posts} />
		</>
	);
};

export default PostPage;
