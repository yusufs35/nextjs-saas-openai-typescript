"use client";

import { deletePost } from "@/actions/post-action";

type PropsType = {
	serializedPost: string;
};

const PostItem = ({ serializedPost }: PropsType) => {
	const post = JSON.parse(serializedPost);

	const handeCopyToClipboard = () => {
		navigator.clipboard.writeText(`${post.title} \n ${post.content}`);
	};

	const handeDelete = () => {
		const answer = confirm("Are you sure to delete?");
		if (!answer) return;
		deletePost(post._id);
	};

	return (
		<div className="w-full flex flex-col gap-4 shadow-sm p-4 rounded-xl bg-white">
			<h1 className="text-2xl px-4 font-bold text-center text-gray-800">
				{post.title}
			</h1>

			{typeof post.content === "string" ? (
				<p className="text-gray-600">{post.content}</p>
			) : (
				<div className="flex flex-col gap-2">
					{post.content.map((paragraph: string, index: number) => (
						<p key={index} className="text-gray-600 mt-2">
							{paragraph}
						</p>
					))}
				</div>
			)}

			<div className=" flex gap-2">
				<button
					className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-all cursor-pointer"
					onClick={handeCopyToClipboard}
				>
					Copy
				</button>

				<button
					className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-500 transition-all cursor-pointer"
					onClick={handeDelete}
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default PostItem;
