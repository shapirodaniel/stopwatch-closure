const assignColor = color => {
	document.body.style.color = 'ghostwhite';
	document.body.style.backgroundColor = color;
};

const buttons = Array.from(document.getElementsByTagName('button'));

buttons.forEach(button => {
	const color = button.id;

	button.addEventListener('click', () => {
		assignColor(color);
	});
});
