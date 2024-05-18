"use client";
import Link from "next/link";
import React from "react";
import Icon from "../common/icon";
import { usePathname } from "next/navigation";

type PropTypes = {
	item: MenuItem;
};

const MenuItem = ({ item }: PropTypes) => {
	const currentRoute = usePathname();
	return (
		<Link
			href={item.route}
			className="flex items-center flex-row relative hover:bg-indigo-50 px-4 py-2 group rounded-lg"
		>
			{currentRoute === item.route ? (
				<div className="absolute bg-indigo-600 rounded-full w-full h-2  -top-3 left-0 md:h-full md:w-2  md:-left-1 md:top-auto "></div>
			) : null}
			<span className="text-gray-500 text-xl group-hover:text-indigo-600">
				<Icon icon={item.icon} />
			</span>
			<span className="text-gray-500 ml-2 group-hover:text-indigo-600">
				{item.text}
			</span>
		</Link>
	);
};

export default MenuItem;
