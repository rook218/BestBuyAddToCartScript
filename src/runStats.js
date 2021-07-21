class RunStats {
	numChecks = 0;
	timeStart = undefined;
	timeEnd = undefined;
	lastCheck = undefined;
	longestGap = 0;
	gapTimings = {};

	constructor() {
		this.lastCheck = new Date();
		this.timeStart = new Date();
	}

	successfulCheck() {
		this.numChecks++;
		const timeSincePrevCheck = new Date() - this.lastCheck;
		this.longestGap = this.numChecks > 10 && timeSincePrevCheck > this.longestGap ?
			timeSincePrevCheck : this.longestGap;
		const normalizedTiming = timeSincePrevCheck - (timeSincePrevCheck % 100);
		if (this.numChecks > 10) {
			if (this.gapTimings[normalizedTiming]) {
				this.gapTimings[normalizedTiming] =  this.gapTimings[normalizedTiming] + 1;
			} else {
				this.gapTimings[normalizedTiming] = 1
			}
			this.longestGap = timeSincePrevCheck > this.longestGap ? timeSincePrevCheck : this.longestGap;
		}
		this.lastCheck = new Date();
	}

	end() {
		this.timeEnd = new Date();
		this.displayStats();
	}

	displayStats() {
		console.log(`Checked ${this.numChecks} times in ${this.timeEnd - this.timeStart} ms. (${this.msToReadableTime(this.timeEnd - this.timeStart)})`);
		console.log(`Average time between checks is ${Math.floor( (this.timeEnd - this.timeStart) / this.numChecks) } ms.`);
		console.log(`The longest gap between checks was ${ this.longestGap } ms.`);
		console.log(`Distribution of time between checks is as follows, to the floor of 100ms`);
		console.log(this.gapTimings);
	}

	
	msToReadableTime(time){
		const second = 1000;
		const minute = second * 60;
		const hour = minute * 60;

		let hours = Math.floor(time / hour % 24);
		let minutes = Math.floor(time / minute % 60);
		let seconds = Math.floor(time / second % 60);
	

		return hours + 'h:' + minutes + "m:" + seconds + "s";
	}
}

module.exports = RunStats;