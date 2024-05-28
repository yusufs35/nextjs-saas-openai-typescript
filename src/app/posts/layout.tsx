import PageTitle from "@/components/common/page-title";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Posts",
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<section className="w-full flex flex-col items-center">
			<section className="w-[95%] max-w-4xl flex flex-col items-center">
				<PageTitle title="Your posts" />
				{children}
			</section>
		</section>
	);
};

export default Layout;
