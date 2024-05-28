import Swal, { SweetAlertOptions } from "sweetalert2";

export const swAlert = (
	title: string,
	icon: string = "info",
	text: string = ""
) => {
	Swal.fire({
		title,
		text,
		icon,
	} as SweetAlertOptions);
};

export const swConfirm = (
	title: string,
	icon: string = "info",
	text: string = "",
	confirmButtonText: string = "Yes"
) => {
	return Swal.fire({
		title,
		text,
		icon,
		showCancelButton: true,
		confirmButtonText,
	} as SweetAlertOptions);
};

export const swToast = (title: string, icon: string = "info") => {
	const Toast = Swal.mixin({
		toast: true,
		position: "top-end",
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});
	Toast.fire({
		icon,
		title,
	} as SweetAlertOptions);
};
