const { Builder, By, until, Capabilities } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");


class Checker {
	CONFIG;
	runStats;
	alertIsTriggered = false;
	constructor(CONFIG, runStats) {
		this.CONFIG = CONFIG;
		this.runStats = runStats;
	}

	sleep = async time => {
		time = time < 0 ? 0 : time;
		await new Promise(resolve => setTimeout(() => { resolve('') }, time));
	}
	
	loadWindow = async (session) => {
		const checkerOptions = new chrome.Options()
			.addArguments('--start-maximized')
			.addArguments(`user-data-dir=${session.userDir}`);
	
		const capabilities = new Capabilities();
		capabilities.setPageLoadStrategy("eager");
		const driver = await new Builder()
			.withCapabilities(capabilities)
			.forBrowser('chrome')
			.setChromeOptions(checkerOptions)
			.build();
	
		await driver.get(session.productUrl);
		return driver;
	}
	
	refreshAndCheckButton = async (driver) => {
		try {
			driver.navigate().refresh();
			const cartButton = await driver.wait(
				until.elementLocated( By.css('.add-to-cart-button') )
			);
			const isAvailable = await cartButton.isEnabled();
			return [!isAvailable, false]
		}
		catch {
			return [false, true];
		}
	}
	
	alert = async (type) => {
		const checkerOptions = new chrome.Options().addArguments('--start-maximized');
		const driver = new Builder()
			.forBrowser('chrome')
			.setChromeOptions(checkerOptions)
			.build();
		await driver.get(this.CONFIG.alertFileLocation);
		let playButton;
		if (type == 'alarm') {
			playButton = await driver.findElement( By.id('alarm-play-button') )
		} else {
			playButton = awaitdriver.findElement( By.id('chimes-play-button') );
		}
		playButton.click();
	}
	
	loop = async (session) => {
			let addToCartClicked = false;
			while (!addToCartClicked) {
				const driver = await this.loadWindow(session);
				addToCartClicked = true;
				let continueChecking = true;
				let isError = false;
				while (continueChecking) {
					// staggers the checks
					await this.sleep(300 - (new Date() - (this.runStats.lastCheck || 0)) );
					[continueChecking, isError] = await this.refreshAndCheckButton(driver);
					const logHeader = `Session: [${session.sessionNickname}] ${(new Date().toLocaleTimeString())}`;
					const logResult = continueChecking ? " not available..." : isError ? " - Error: Re-initializing window..." : " available!";
					console.log(logHeader + logResult);
					this.runStats.successfulCheck();
				}
				if (isError) {
					addToCartClicked = false;
					await driver.close();
				} else if (!this.alertIsTriggered) {
					this.alert('alarm');
					this.alertIsTriggered = true;
					const userCartButton = await driver.findElement(By.css('.add-to-cart-button'));
					userCartButton.click();
					addToCartClicked = true;
				}
			}
	}
	
	run = async () => {
		for (const session of this.CONFIG.sessions) {
			await this.sleep(250);
			this.loop(session);
		}
	}
}

module.exports = Checker;