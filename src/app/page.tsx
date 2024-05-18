import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default async function Home() {
	const session = await getSession();

	return (
		<main>
			<h1 className=" text-4xl">Hello</h1>
			{session?.user ? (
				<>
					<p>The user {session?.user?.name} is logged in</p>
					<p>
						<Link href="/api/auth/logout">Logout</Link>
					</p>
				</>
			) : (
				<p>
					<Link href="/api/auth/login">Login</Link>
				</p>
			)}
		</main>
	);
}
