import Image from "next/image";
import React from "react";
import LogoutBtn from "./logout-btn";
import { auth } from "@/auth";
import { Session, User } from "next-auth";

const ProfileBar = async () => {
	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	return (
		<>
			{user ? (
				<div className="flex flex-row justify-end items-center gap-2">
					<Image
						src={user?.image || ""}
						alt={user?.name || "User profile"}
						width={24}
						height={24}
						className="rounded-full"
					/>
					<span className="font-semibold text-gray-600">
						Hi,{" "}
						<span className="hidden md:inline">{user?.name}</span>
					</span>
					<LogoutBtn />
				</div>
			) : (
				<div></div>
			)}
		</>
	);
};

export default ProfileBar;
