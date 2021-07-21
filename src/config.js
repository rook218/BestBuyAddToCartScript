// List of user directories for Chrome to start a session on (with your Best Buy account logged in), and the URL of the product that session should check

const url3080 = 'https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440';
const CONFIG = {
	alertFileLocation: 'file:///C:/path/to/alarm/alert.html', // the full path on your computer to the HTML file in this codebase, src\alarm\alert.html
	sessions: [
		{
			sessionNickname: "1",
			userDir: `C:\\Arbitrary\\path\\to\\user\\directory-1`,
			productUrl: url3080	
		},
		{
			sessionNickname: "2",
			userDir: `C:\\Arbitrary\\path\\to\\user\\directory-2`,
			productUrl: url3080	
		},
		{
			sessionNickname: "3",
			userDir: `C:\\Arbitrary\\path\\to\\user\\directory-3`,
			productUrl: url3080	
		},
		{
			sessionNickname: "4",
			userDir: `C:\\Arbitrary\\path\\to\\user\\directory-4`,
			productUrl: url3080	
		},
		{
			sessionNickname: "5",
			userDir: `C:\\Arbitrary\\path\\to\\user\\directory-5`,
			productUrl: url3080	
		},
		{
			sessionNickname: "6",
			userDir: `C:\\Arbitrary\\path\\to\\user\\directory-6`,
			productUrl: url3080	
		}
	]
};

module.exports = CONFIG;