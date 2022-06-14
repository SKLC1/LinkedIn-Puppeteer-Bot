
import PuppeteerExtra from "puppeteer-extra";
import stealthPlugin from 'puppeteer-extra-plugin-stealth'


// * your details
//accoutn emails
const email = 'tamirgalim@gmail.com';
const password = 'asdfasdf12345'
const recruitersCategory = 'finance'

async function openLinkedIn() {
  PuppeteerExtra.use(stealthPlugin())
  const browser = await PuppeteerExtra.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.linkedin.com/')
  // login
  await page.click(".nav__button-secondary")
  await page.waitForTimeout(1000);
  await page.type("#username",email,{delay: 15})
  await page.type("#password",password,{delay: 15})
  await page.waitForTimeout(1000);
  await page.click(".btn__primary--large")
  await page.waitForTimeout(4000);
  //! search for desired title
  // page.waitForSelector('.search-global-typeahead__input', {visible: true})
  // await page.type(".search-global-typeahead__input",`${recruitersCategory} recruiters`,{delay: 15})
  // await page.keyboard.press('Enter');
  getMoreConnections(page, browser)
}

async function getMoreConnections(page,browser){
  
  await page.goto('https://www.linkedin.com/mynetwork/',{
    waitUntil: 'load',
    timeout: 0
  })
  await page.waitForTimeout(2000);
  // close messages
  await page.waitForSelector("#ember60");
  await page.click("#ember60")
  // open all suggested connections
  await page.waitForSelector('button[aria-label="See all People you may know with similar roles"]');
  await page.click('button[aria-label="See all People you may know with similar roles"]')
  // get all suggested connection
  await page.waitForTimeout(3000);
  const buttonSpans = await page.$$('button > span')
  buttonSpans.forEach( async (span) => {
    await page.waitForSelector('button > span')
    let element = await page.$(span)
    let value = await element.evaluate(el => el.textCurrent, element)
    console.log(JSON.stringify(value));
  });

  console.log('done');
}

openLinkedIn()

//demo acc:
//email: tamirgalim@gmail.com
//pass: asdfasdf12345
