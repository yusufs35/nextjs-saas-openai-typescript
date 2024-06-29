import { menu } from "@/data/menu";
import React from "react";
import MenuItem from "./menu-item";
import { Session, User } from "next-auth";
import { auth } from "@/auth";

const Sidebar = async () => {
	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	return user ? (
		<div className=" bg-white border border-gray-100 py-2 flex flex-shrink-0 flex-row justify-around md:justify-start md:flex-col md:h-full md:w-32 z-10">
			{menu.map((item) => (
				<MenuItem item={item} key={item.id} />
			))}
		</div>
	) : (
		<div className="md:w-32"></div>
	);
};

export default Sidebar;
