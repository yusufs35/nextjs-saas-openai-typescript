import PageTitle from "@/components/common/page-title";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Posts",
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<PageTitle title="Your posts" />
			{children}
		</>
	);
};

export default Layout;
