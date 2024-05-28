import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";
import React from "react";
import LogoutBtn from "./logout-btn";

const ProfileBar = async () => {
	const { user } = (await getSession()) || {};

	return (
		<>
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
					<LogoutBtn />
				</div>
			) : (
				<div></div>
			)}
		</>
	);
};

export default ProfileBar;
