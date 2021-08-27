///////////////////////
/* Stopwatch Builder */
///////////////////////

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
			console.log(currentTime);
			isRunning = true;
			countdown = setInterval(() => {
				if (currentTime > 0) {
					currentTime--;
					this.setTime(currentTime);
				} else {
					this.stop();
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

		getCurrentTime: () => {
			return currentTime;
		},
	};
};

/////////////////////////////
/* Instantiate a stopwatch */
/////////////////////////////

const stopwatchInstance = createStopwatch();

///////////////////////////////////
/* Grab our buttons from the DOM */
///////////////////////////////////

const START_BUTTON = document.getElementById('start');
const PAUSE_BUTTON = document.getElementById('stop');
const CLEAR_BUTTON = document.getElementById('clear');

//////////////////////////////////////////////////////
/* Define a click handler for each button in our UI */
//////////////////////////////////////////////////////

const handleClick = button => {
	switch (button.id) {
		case 'start':
			if (!stopwatchInstance.isRunning()) {
				stopwatchInstance.start();
			}
			break;
		case 'stop':
			stopwatchInstance.stop();
			break;
		case 'clear':
			stopwatchInstance.clear();
			break;
	}
};

/////////////////////////////////////////
/* Assign click handler to each button */
/////////////////////////////////////////

[START_BUTTON, PAUSE_BUTTON, CLEAR_BUTTON].forEach(node => {
	node.addEventListener('click', () => handleClick(node));
});

const FACE = document.getElementById('face');
const CURRENT_TIME = document.getElementById('currentTime');

///////////////////////////////////////////////////////////////////////
/* Assign listeners that will let us modify the start time through UI*/
///////////////////////////////////////////////////////////////////////

FACE.addEventListener('click', () => {
	if (stopwatchInstance.isRunning()) {
		return;
	}

	CURRENT_TIME.innerText = '';
	CURRENT_TIME.contentEditable = true;
	CURRENT_TIME.focus();
});

CURRENT_TIME.addEventListener('blur', () => {
	stopwatchInstance.setTime(
		CURRENT_TIME.innerText === ''
			? stopwatchInstance.getCurrentTime()
			: CURRENT_TIME.innerText
	);
	CURRENT_TIME.contentEditable = false;
});