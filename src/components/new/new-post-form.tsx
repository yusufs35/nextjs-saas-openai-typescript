"use client";
import { tones } from "@/data/tones";
import { generatePost } from "@/lib/functions";
import React, { useState } from "react";
import { FaRegTired, FaSpinner } from "react-icons/fa";

let handleChangeType:
	| HTMLInputElement
	| HTMLTextAreaElement
	| HTMLSelectElement;

const NewPostForm = () => {
	const [post, setPost] = useState<Post | null>(null);
	const [submiting, setSubmiting] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [postPrompt, setPostPrompt] = useState<PostPrompt>({
		title: "",
		description: "",
		keywords: "",
		tone: "",
	});

	const handleChange = (e: React.ChangeEvent<typeof handleChangeType>) => {
		const { name, value } = e.target;

		setPostPrompt({ ...postPrompt, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmiting(true);
		setError(false);
		setSuccess(false);

		try {
			const res = await generatePost(postPrompt);
			const data = await res.json();
			setPost(data);
			setSuccess(true);

		} catch (err) {
			setError(true);
		} finally {
			setSubmiting(false);
		}
	};

	return (
		<>
			<form
				className="w-full flex flex-col gap-4 mt-4 items-center"
				onSubmit={handleSubmit}
			>
				<div className="w-full flex flex-col gap-2">
					<label
						htmlFor="title"
						className="text-gray-600 text-sm font-semibold"
					>
						Title (optional)
					</label>
					<input
						type="text"
						id="title"
						name="title"
						placeholder="Enter a title (e.g. How to make a blog post)"
						className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigi-600"
						value={postPrompt.title}
						onChange={handleChange}
					/>
				</div>

				<div className="w-full flex flex-col gap-2">
					<label
						htmlFor="description"
						className="text-gray-600 text-sm font-semibold"
					>
						Description
					</label>
					<textarea
						id="description"
						name="description"
						placeholder="Enter a description (e.g. This is a blog post about how to write proper blog posts that are easy to read and understand)"
						className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigi-600"
						value={postPrompt.description}
						onChange={handleChange}
					/>
				</div>

				<div className="w-full flex flex-col gap-2">
					<label
						htmlFor="keywords"
						className="text-gray-600 text-sm font-semibold"
					>
						Keywords
					</label>
					<input
						type="text"
						id="keywords"
						name="keywords"
						placeholder="Enter keywords "
						className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigi-600"
						value={postPrompt.keywords}
						onChange={handleChange}
					/>
				</div>

				<div className="w-full flex flex-col gap-2">
					<label
						htmlFor="tone"
						className="text-gray-600 text-sm font-semibold"
					>
						Tone
					</label>
					<select
						name="tone"
						id="tone"
						className="w-full border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigi-600"
						value={postPrompt.keywords}
						onChange={handleChange}
					>
						{tones.map((item) => (
							<option value={item.value} key={item.label}>
								{item.label}
							</option>
						))}
					</select>
				</div>

				<button
					type="submit"
					className="bg-indigo-600 w-fit text-white px-4 py-2 rounded-md mt-4 hover:bg-indigo-500 transition-all cursor-pointer flex items-center gap-2"
					disabled={submiting}
				>
					{submiting ? (
						<>
							<FaSpinner className="animate-spin" /> Submitting...
						</>
					) : (
						"Submit"
					)}
				</button>
			</form>

			{error && (
				<div className="w-full flex flex-col gap-4 items-center mt-4">
					<FaRegTired className="w-8 h-8 text-rose-600" />
					<p className="text-rose-600 text-center">
						Something went wrong. Please try again.
					</p>
				</div>
			)}

			{success && (
				<div className="w-full flex flex-col gap-4 items-center mt-4">
					<h1 className="text-4xl font-bold text-gray-800 text-center">
						{post?.title}
					</h1>

					{typeof post?.content === "string" ? (
						<p className="text-gray-600">{post?.content}</p>
					) : (
						<div className="flex flex-col gap-2">
							{post?.content.map((paragraph, index) => (
								<p className="text-gray-600" key={index}>
									{paragraph}
								</p>
							))}
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default NewPostForm;
