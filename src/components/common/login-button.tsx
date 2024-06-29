import { signIn } from "@/auth";
import React from "react";

const LoginButton = () => {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("auth0");
			}}
		>
			<button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-all" type="submit">
				Login to get started
			</button>
		</form>
	);
};

export default LoginButton;
