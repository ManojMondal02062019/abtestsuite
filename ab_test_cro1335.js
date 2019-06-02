const fs = require('fs');
var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;


var service = new chrome.ServiceBuilder(path).build();


chrome.setDefaultService(service);
jest.setTimeout(30000);


describe('test google.com', () => {

    const {Builder, By, Key, logging, until} = require('selenium-webdriver');
    var driver;
	logging.installConsoleHandler();
	logging.getLogger('webdriver.http').setLevel(logging.Level.ERROR);

    beforeEach(() => {
        driver = new webdriver.Builder()
				.withCapabilities(webdriver.Capabilities.chrome())
				.setChromeService(
					new chrome.ServiceBuilder()
					.enable
					.setStdio('inherit'))
        		.build();
		driver.manage().setTimeouts( { implicit: 40000 } );
    });

    afterEach(() => {
        driver.quit();
    });

    it('should open google search', async () => {
        await driver.get('https://www.att.com/buy/phones/?abtest=CRO-1335');
		await driver.wait(until.titleContains("Cell Phones"), 35000);
        driver
            .getTitle()
            .then(title => {
                expect(title).toEqual("Cell Phones - Shop AT&T's Selection of Cell Phones & Smartphones");
            });
    });
});