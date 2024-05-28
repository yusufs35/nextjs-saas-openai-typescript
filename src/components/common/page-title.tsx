import React from "react";

type PageProps = {
	title: string;
};

const PageTitle = ({ title }: PageProps) => {
	return (
		<h1 className="text-4xl font-bold text-center text-indigo-600">
			{title}
		</h1>
	);
};

export default PageTitle;
