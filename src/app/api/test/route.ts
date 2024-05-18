import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, response: NextResponse) => {
	try {
		return NextResponse.json({ message: "Hello World" });
	} catch (error) {
		return NextResponse.error();
	}
};
