const createStopwatch = () => {
	let currentTime = 0;
	let countdown;
	let isRunning = false;

	return {
		setTime: newDuration => {
			if (typeof +newDuration !== 'number' || newDuration < 0) {
				throw new Error('Please supply an non-negative integer value');
			}
			currentTime = newDuration;
			document.getElementById('currentTime').innerText = currentTime;
		},
		start: function () {
			isRunning = true;
			countdown = setInterval(() => {
				if (currentTime > 0) {
					currentTime--;
					this.setTime(currentTime);
				} else {
					clearInterval(countdown);
				}
			}, 1000);
		},
		stop: () => {
			clearInterval(countdown);
			isRunning = false;
		},
		clear: function () {
			clearInterval(countdown);
			currentTime = 0;
			this.setTime(currentTime);
			isRunning = false;
		},
		isRunning: () => {
			return isRunning;
		},
	};
};

const stopwatchInstance = createStopwatch();

const START_BUTTON = document.getElementById('start');
const PAUSE_BUTTON = document.getElementById('stop');
const CLEAR_BUTTON = document.getElementById('clear');

const handleClick = button => {
	switch (button.id) {
		case 'start':
			if (!stopwatchInstance.isRunning()) {
				stopwatchInstance.start();
			}
		case 'stop':
			stopwatchInstance.stop();
		case 'clear':
			stopwatchInstance.clear();
	}
};

[START_BUTTON, PAUSE_BUTTON, CLEAR_BUTTON].forEach(node => {
	node.addEventListener('click', () => handleClick(node));
});

const CURRENT_TIME = document.getElementById('currentTime');

CURRENT_TIME.addEventListener('click', () => {
	CURRENT_TIME.contentEditable = true;
});

CURRENT_TIME.addEventListener('blur', () => {
	stopwatchInstance.setTime(CURRENT_TIME.innerText);
	CURRENT_TIME.contentEditable = false;
});
