export function removeClassById(id: string, className, AnimationDuration: number) {
	setTimeout(() => {
		const d = document.getElementById(`${id}`);
		d.classList.remove(className);
	}, AnimationDuration * 1000 + 100);
}

export function ngFocus(id: string) {
	setTimeout(() => {
		const d = document.getElementById(`${id}`);
		d.focus();
		d.scrollIntoView({ behavior: 'smooth', block: 'center' });
	});
}
