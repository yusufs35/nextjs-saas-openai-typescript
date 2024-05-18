import dynamic from "next/dynamic";
import React from "react";
import { IconType } from "react-icons";

type IconProps = {
	family?: string;
	icon: string;
};

const loadIcon = ({ family, icon }: IconProps): any => {
	switch (family) {
		case "ai":
			return dynamic(() =>
				import("react-icons/ai").then((mod) => mod[icon] as IconType)
			);
		case "tfi":
			return dynamic(() =>
				import("react-icons/tfi").then((mod) => mod[icon] as IconType)
			);
		case "fa":
			return dynamic(() =>
				import("react-icons/fa").then((mod) => mod[icon] as IconType)
			);
		case "bi":
			return dynamic(() =>
				import("react-icons/bi").then((mod) => mod[icon] as IconType)
			);
		case "md":
			return dynamic(() =>
				import("react-icons/md").then((mod) => mod[icon] as IconType)
			);
		case "fi":
			return dynamic(() =>
				import("react-icons/fi").then((mod) => mod[icon] as IconType)
			);
		default:
			throw new Error(`Icon family "${family}" is not supported.`);
	}
};

const Icon = ({ icon, family = "bi", ...rest }: IconProps) => {
	const IconPlaceHolder = family && icon ? loadIcon({ family, icon }) : null;

	if (!IconPlaceHolder) return <></>;

	return <IconPlaceHolder {...rest} />;
};

export default Icon;
