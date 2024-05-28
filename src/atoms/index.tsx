"use client";
import React from "react";
import { RecoilRoot } from "recoil";

type PropType = {
	children: string | JSX.Element;
};

const RecoilContext = ({ children }: PropType) => {
	return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilContext;
