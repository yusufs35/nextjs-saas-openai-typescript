import { connectToDB } from "@/lib/mongo";
import { Auth0Claims } from "@/types/auth0-session";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const GET = withApiAuthRequired(async (req: NextRequest) => {
	const res = new NextResponse();

	const { db } = await connectToDB();

	try {
		const session = await getSession(req, res);
		const user: Auth0Claims | undefined = session?.user;

		const posts = db
			.collection("posts")
			.find({
				uid: user?.sub,
			})
			.toArray();

		console.log("ALOOOOO");

		return NextResponse.json(posts, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.error();
	}
});
