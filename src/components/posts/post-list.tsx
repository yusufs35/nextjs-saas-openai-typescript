import React from "react";
import PostItem from "./post-item";
import { Document, WithId } from "mongodb";

type PropTypes = {
	posts: WithId<Document>[];
};

const PostList = ({ posts }: PropTypes) => {
	return (
		<>
			{posts.length > 0 &&
				posts.map((item) => {
					const serializedPost = JSON.stringify(item);
					return (
						<PostItem
							serializedPost={serializedPost}
							key={item._id.toString()}
						/>
					);
				})}
		</>
	);
};

export default PostList;
