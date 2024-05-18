import React from "react";
import { headers } from "next/headers";



const UserPage = () => {
	const headersList = headers();

	console.log("host", headersList.get("host"));
	console.log("next-url", headersList.get("next-url"));
	console.log("referer", headersList.get("referer"));


	return <div>Page</div>;
};

export default UserPage;
