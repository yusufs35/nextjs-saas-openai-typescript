import PageTitle from "@/components/common/page-title";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Profile",
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<PageTitle title="Profile" />

			{children}
		</>
	);
};

export default Layout;
