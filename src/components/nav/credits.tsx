import Link from "next/link";
import React from "react";
import { BiCoin } from "react-icons/bi";
import Credit from "../common/credit";
import { auth } from "@/auth";
import { Session, User } from "next-auth";

const Credits = async () => {
	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	return (
		<>
			{user ? (
				<div className="flex justify-start">
					<div className="flex flex-col md:flex-row justify-start items-center md:gap-4">
						<div className="flex items-center g-1">
							<BiCoin />{" "}
							<span className="hidden md:block">Credits:</span>{" "}
							<Credit />
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
		</>
	);
};

export default Credits;
