import PageTitle from "@/components/common/page-title";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "New post",
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<>
			<PageTitle title="Generate a new post" />
			{children}
		</>
	);
};

export default Layout;
