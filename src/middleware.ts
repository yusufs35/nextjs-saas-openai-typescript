export { auth as middleware } from "@/auth"

export const config = {
	matcher: [
		"/new/:path*",
		"/posts/:path*",
		"/profile/:path*",
	],
};
