## Prerequisites

#### Install VSCode
* [Download VSCode](https://code.visualstudio.com/download)
* Open the .zip file
* Copy Visual Studio Code Application to Applications

### Install Node.js
* [Download node](https://nodejs.org/en/download)
* Download node version 15 and above
* With command `nvm install v18.0.0`

### Clone the Repo and Install Dependencies
* Make a directory in your home directory or similar and name it something useful (`mkdir ~/Repos`) and change to that directory (`cd ~/Repos`)
* Run `git clone git@scm.platform.avalara.io:avatax-ux/avatax-customer-portal.git`. You should not be prompted for password.
* Run `cd avatax-customer-portal` to change your present working directory to the project root

### Run the following command to install all necessary dependencies
* `npm install`

### Install Playwright Browsers
* `npx playwright install`
* (if your project already has a playwright.config.js file)
`npx playwright install --with-deps`

###  Run Tests
* `npx playwright test`
* `npx playwright test --ui`
* To run a specific test file `npx playwright test tests/example.test.js`

### Open the Playwright Test Report
* `npx playwright show-report`

###  Debugging & Interactive Mode
* `npx playwright test --debug`