import PageTitle from "@/components/common/page-title";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "New post",
};

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<section className="w-100 flex flex-col items-center pt-4">
			<section className="w-[95%] max-w-4xl">
				<PageTitle title="Generate a new post" />

				{children}
			</section>
		</section>
	);
};

export default Layout;
