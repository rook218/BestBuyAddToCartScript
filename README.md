# Best Buy Automated "Add to Cart" Script
## Purpose
It's nearly impossible to buy certain items at Best Buy right now, and to combat that Best Buy has implemented a queue system on their website. When a product is available, the add to cart button becomes enabled. Clicking this button only adds someone to the queue for the product - they will have to press the add to cart button again and complete the checkout process if they are able. This bot automates the first part of that process, by constantly refreshing an arbitrary number of windows and checking if the add to cart button is enabled. If it is, it will click the button to add the user to the queue immediately, then play an alert sound to let the user know to return to the computer and finish the checkout process if they are able.
## Functionality
This script provides functionality that was lacking in other scripts:

1) Can handle an arbitrary number of windows checking an arbitrary number of items

2) Session management - if you sign into each of the user sessions, the Chrome webdriver will be able to access that token in the session and keep you signed in. This significantly reduces the amount of time it takes to check out.

3) Local alerts - leave this running on a spare laptop or computer in your workspace and you'll be able to know immediately when something on your list is for sale.
## Set Up
Set up is relatively complex as this script relies on several trusted, open source automated software testing packages to take control of a browser session. If you are concerned about security, feel free to research any of the packages on your own.

### Windows
1) Install NodeJS v 14.x.x
    * WHAT: This is the program that your computer uses to interpret the code that the script is written in (JavaScript)
    * WHY: Your computer can't understand the code or console commands required to run the code without Node being installed.
    * HOW: Go to the [Node website](https://nodejs.org/en/) and select the LTS installer (as of July 2021, this was 14.17.3) and run through the installation process. Make sure to "Add to Path" during install so the commands can work from any directory.

2) Install ChromeDriver
    * WHAT: An application that allows an automated script to drive Chrome.
    * WHY: The script relies on being able to control Chrome sessions to check the availability of products and click the "Add to Cart" button.
    * HOW: Go to the [ChromeDriver website](https://chromedriver.chromium.org/downloads) and select the version that matches up with your version of Chrome. To find your version of Chrome, open a Chrome window and select the three-dot menu icon in the top right, Help > About Google Chrome. Once you've downloaded ChromeDriver, put the application (the .exe file) in a directory associated with your system's PATH variable. See [this link](https://superuser.com/a/284351) for instructions

3) Clone or download this repo
    * WHAT: This is the codebase that contains the script.
    * WHY: This is the code that you want to run.
    * HOW: If you want to use git, just navigate to your chosen directory in the command line and run `git clone https://thelinktothisrepo`. If you prefer to download without git, you can download the executable and extract it anywhere you like

4) Install the required modules
    * WHAT: This codebase has third-party dependencies that are not downloaded along with the codebase.
    * WHY: This isn't programmed from the ground up, it relies on open source automated testing technologies Selenium 
    * HOW: Open your command prompt, navigate to the directory this repo is saved to, and run `npm install --save-dev`. This looks at the package-lock.json file and reaches out to the npm server, finds the right versions, and installs them in your project directory in the `node_modules` folder.

5) Configure your preferences
    * WHAT: Modifying the CONFIG.js file
    * WHY: So that the script looks for the items you want, instead of the items I want.
    * HOW: See bullets below.
    * In the CONFIG.js file, change the values of the properties to the URL of the product you want, and the session nickname that will appear in the log.
    * Also set the userDirectory to be any location on your computer - that's where Chrome will store session information and keep you logged in.
    * Each block in curly braces `{}` will run a new session of Chrome. If you have 20 blocks in curly braces, the script will open 20 Chrome windows. I recommend you use 6-8, as anything less doesn't check as often as it could and any more will take up so many system resources that it will run slower than it could.
    * Make sure to save this file, since Node will read what's saved on the hard drive and not what's open in the window.

6) Run the script (and sign in to all sessions)
    * WHAT: Not really a what, see why.
    * WHY: Running the script will open the Chrome user directories that you specified, and you'll be able to sign in with session storage
    * HOW: In your command prompt, navigate to the project folder and run `npm start`. This opens the Chrome windows, but the sessions are blank and you are not logged into BestBuy. Just sign in to every window, then **kill the program by going to your command prompt and hitting CTRL+C twice**

 

7) Run the script (for real automated checking and queuing)
    * WHAT: Run the script.
    * WHY: For the reason you downloaded it, to check Best Buy and automate the checking/ add to queue process.
    * HOW: In your command prompt, navigate to the directory this repo is saved to, and run `npm start`. Make sure that all the sessions that open are signed in to your account. If you want to test the alerts, just replace one of the product URLs in the CONFIG.js file with a product that is currently available.

8) Kill this program at any time by going to your command prompt and hitting CTRL+C twice
### Mac
I don't know, but very close to what's above.
## Best Practices

1) In your command prompt, right click the top bar and select "Defaults", then **disable** Quick Edit Mode. This mode pauses execution of a running script to give a user time to copy the log output, and we want this script to run continuously. After you set the default, you may also need to change the current setting in "Properties".