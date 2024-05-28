
import PageTitle from "@/components/common/page-title";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Profile",
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<div className="w-full flex flex-col items-center">
			<div className="w-[95%] max-w-4xl flex flex-col items-center gap-4">
				<PageTitle title="Profile" />
				
				{children}
			</div>
		</div>
	);
};

export default Layout;
