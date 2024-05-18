import { menu } from "@/data/menu";
import { getSession } from "@auth0/nextjs-auth0";
import React from "react";
import MenuItem from "./menu-item";

const Sidebar = async () => {
	const { user } = (await getSession()) || {};

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
