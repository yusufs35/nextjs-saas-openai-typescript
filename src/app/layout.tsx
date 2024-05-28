import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "@/components/nav/navbar";
import Sidebar from "@/components/nav/sidebar";
import { RecoilRoot } from "recoil";
import RecoilContext from "@/atoms";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		template: `%s | Bloggify`,
		default: "Bloggify",
	},
	description:
		"Discover insightful articles, expert tips, and engaging stories on Bloggify. Your go-to destination for the latest trends, practical advice, and inspiration across various topics. Stay informed, entertained, and inspired with Bloggify.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<UserProvider>
				<RecoilContext>
					<body
						suppressHydrationWarning={true}
						className={`${inter.className} bg-gray-50 h-screen overflow-clip flex flex-col`}
					>
						<Navbar />
						<main className="w-full h-full flex flex-col md:flex-row">
							<Sidebar />
							<div className="w-full md:pr-32 overflow-y-auto">
								{children}
							</div>
						</main>
					</body>
				</RecoilContext>
			</UserProvider>
		</html>
	);
}
