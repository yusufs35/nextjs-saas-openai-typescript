import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiPen, BiCoin, BiLogOut } from "react-icons/bi";

const Navbar = async () => {
	const { user } = (await getSession()) || {};

	return (
		<nav className="w-full bg-white shadow-md px-6 py-2 z-20 grid grid-cols-3">
			{user ? (
				<div className="flex justify-start">
					<div className="flex flex-col md:flex-row justify-start items-center md:gap-4">
						<div className="flex items-center g-1">
							<BiCoin />{" "}
							<span className="hidden md:block">Credits:</span> 0
						</div>
						<Link
							href="/profile"
							className="text-xs md:text-xl font-bold text-gray-600 hover:text-indigo-600"
						>
							BUY MORE
						</Link>
					</div>
				</div>
			) : (
				<div></div>
			)}

			<Link
				href="/"
				className="flex flex-row justify-center items-center gap-1 font-medium text-xl"
			>
				<BiPen /> Bloggify
			</Link>
			{user ? (
				<div className="flex flex-row justify-end items-center gap-2">
					<Image
						src={user?.picture || ""}
						alt={user?.name}
						width={24}
						height={24}
						className="rounded-full"
					/>
					<span className="font-semibold text-gray-600">
						Hi,{" "}
						<span className="hidden md:inline">{user?.name}</span>
					</span>
					<Link
						href="/api/auth/logout"
						className="font-semibold text-gray-600 text-xl cursor-pointer hover:text-indigo-600"
					>
						<BiLogOut />
					</Link>{" "}
				</div>
			) : (
				<div></div>
			)}
		</nav>
	);
};

export default Navbar;
