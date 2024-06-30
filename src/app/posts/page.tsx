import { getPosts } from "@/actions/post-action";
import PostList from "@/components/posts/post-list";
import React from "react";

const PostPage = async () => {
	const posts = await getPosts();
	
console.log(posts)
	return (
		<section className="w-full flex flex-col items-center">
			<section className="w-[95%] max-w-4xl flex flex-col items-center">
				
				<div className="w-full flex flex-col gap-8 mt-4 items-center">
					{posts.length <= 0 && (
						<h1 className="text-2xl font-bold text-center text-gray-500">
							You have no posts yet!
						</h1>
					)}
				</div>

				<PostList posts={posts}/>
			</section>
		</section>
	);
};

export default PostPage;
