const createStopwatch = () => {
	let currentTime = 0;

	let countdown = setTimeout(() => {
		while (currentTime > 0) {
			currentTime--;
		}
	}, 1000);

	return {
		pause: () => {
			clearTimeout(countdown);
		},
		start: () => {
			countdown = setTimeout(() => {
				while (currentTime > 0) {
					currentTime--;
					console.log(currentTime);
				}
			});
		},
		clear: () => {
			currentTime = 0;
		},
		setTime: newDuration => {
			currentTime = newDuration;
		},
	};
};

const stopwatchInstance = createStopwatch();
