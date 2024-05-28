import Link from "next/link";
import React from "react";
import { BiPen } from "react-icons/bi";

const Logo = () => {
	return (
		<Link
			href="/"
			className="flex flex-row justify-center items-center gap-1 font-medium text-xl"
		>
			<BiPen /> Bloggify
		</Link>
	);
};

export default Logo;
