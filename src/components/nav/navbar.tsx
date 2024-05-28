import React from "react";
import Credits from "./credits";
import Logo from "./logo";
import ProfileBar from "./profile-bar";

const Navbar = async () => {
	return (
		<nav className="w-full bg-white shadow-md px-6 py-2 z-20 grid grid-cols-3">
			<Credits />
			<Logo />
			<ProfileBar />
		</nav>
	);
};

export default Navbar;
