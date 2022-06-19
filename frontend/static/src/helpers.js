export const handleError = (err) => {
	console.warn(err);
}

export const scrollToBottomMessage = () => {
	const div = document.querySelector('.scroll-bottom');
	div.scrollIntoView(false);
}