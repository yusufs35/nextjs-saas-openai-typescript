import PostSkeleton from "@/components/skeletons/post-skeleton";
import React from "react";

const PostPage = () => {
	return (
		<div className="w-full flex flex-col gap-8 mt-4 items-center">
			<PostSkeleton />
			<PostSkeleton />
			<PostSkeleton />
		</div>
	);
};

export default PostPage;
