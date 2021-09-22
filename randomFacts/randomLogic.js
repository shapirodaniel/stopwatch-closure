const throttleRequest = (requestFn, threshold) => {
	let isOkToRequest = true;

	return function (...args) {
		if (isOkToRequest) {
			requestFn.apply(this, args);

			isOkToRequest = false;

			setTimeout(() => {
				isOkToRequest = true;
			}, threshold);
		} else {
			console.log(`Requests must be placed ${threshold}ms apart`);
		}
	};
};

const getRandomFact = async () => {
	const url = 'https://uselessfacts.jsph.pl/random.json?language=en';
	const res = await fetch(url);
	const data = await res.json();
	document.getElementById('message').innerText = data.text;
};

const throttledGetRandomFact = throttleRequest(getRandomFact, 1000);

document
	.getElementById('getFact')
	.addEventListener('click', () => throttledGetRandomFact());
