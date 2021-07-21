const CONFIG = require("./config.js");
const Checker = require("./checker.js");
const RunStats = require("./runStats.js");
const process = require('process');


const runStats = new RunStats();
const checker = new Checker(CONFIG, runStats);

checker.run();

process.on("SIGINT", () => {
	runStats.end();
	process.exit();
});


