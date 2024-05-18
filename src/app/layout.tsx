import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Navbar from "@/components/nav/navbar";
import Sidebar from "@/components/nav/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<UserProvider>
				<body className={`${inter.className} bg-gray-50 h-screen overflow-clip flex flex-col`}>
					<Navbar />
					<main className="w-full h-full flex flex-col md:flex-row">
						<Sidebar />
						<div className="w-full md:pr-32">{children}</div>
					</main>
				</body>
			</UserProvider>
		</html>
	);
}
