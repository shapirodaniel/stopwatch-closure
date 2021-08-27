const getRandomFact = () => {
	const url = 'https://uselessfacts.jsph.pl/random.json?language=en';
	fetch(url)
		.then(res => res.json())
		.then(data => {
			document.getElementById('message').innerText = data.text;
		});
};

document
	.getElementById('getFact')
	.addEventListener('click', () => getRandomFact());
