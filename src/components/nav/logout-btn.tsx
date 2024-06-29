"use client";
import { swConfirm } from "@/lib/swal";
import { useRouter } from "next/navigation";
import React from "react";
import { BiLogOut } from "react-icons/bi";

const LogoutBtn = () => {
	const router = useRouter();

	const handleLogout = async () => {
		const res = await swConfirm("Are you sure to logout", "question");
		if (res.isConfirmed) router.replace("/api/auth/signout");
	};

	return (
		<button
			onClick={handleLogout}
			className="font-semibold text-gray-600 text-xl cursor-pointer hover:text-indigo-600"
		>
			<BiLogOut />
		</button>
	);
};

export default LogoutBtn;
