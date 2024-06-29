import { auth } from "@/auth";
import LoginButton from "@/components/common/login-button";
import { Session, User } from "next-auth";

export default async function Home() {
	const session: Session | null = await auth();
	const user: User | undefined = session?.user;

	return (
		<section className="w-full flex flex-col">
			{user ? (
				<div className="flex flex-col items-center justify-center gap-4">
					<h1 className="mt-4 text-4xl font-bold text-center text-indigo-600">
						Hi, {user?.nickname || user?.name || "dear user"}
					</h1>
					<h2 className="text-xl max-w-lg text-center text-gray-600">
						Welcome to Bloggify, where you can easly create full
						blog posts with just one click!
					</h2>
					<a
						href="/new"
						className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-all"
					>
						Get started
					</a>
				</div>
			) : (
				<div className="flex flex-col items-center justify-center gap-4">
					<h1 className="mt-4 text-4xl font-bold text-center text-indigo-600">
						Hello!
					</h1>
					<h2 className="text-xl max-w-lg text-center text-gray-600">
						Welcome to Bloggify, where you can easly create full
						blog posts with just one click!
					</h2>
					<LoginButton/>
				</div>
			)}
		</section>
	);
}
