# hardware-store

My approach is:

### -- To use a JS based Selenium framework (Protractor/Jasmine)

### -- Use Page Objects to keep specs readable, scalable, easy to add to

  -- Elements and Functions encapsulated for re-use across multiple specs

### -- Define easy to read Data Objects for specs that need data

  -- Keeps data obvious to contributors

  -- Data Objects could be used to drive specs

### -- Create end to end tests, but also create a few sanity tests to run if necessary

## NOTE: The baseUrl variable is intentionally left blank because it refers to company name

To run the specs against a baseUrl, please define the baseUrl in configs/config.js OR
use the --baseUrl flag on command line.

## How to run:

1. Install nodeJS

https://nodejs.org/en/

2. Install Protractor

https://www.protractortest.org/#/

~ $ npm install -g protractor

3. Add Selenium

~ $ webdriver-manager update


4. Start Seleniun

~ $ webdriver-manager start


-- Follow instructions to install Java if not already installed

5. Clone hardware-store repository

~ $ git clone https://github.com/chad-owens/hardware-store

6. Run the specs

  To run e2e specs:

~ $ protractor configs/config.js --suite=e2e --baseUrl={needToDefineUrl}

  To run some sanity specs:

~ $ protractor configs/config.js --suite=sanity

  To run all specs:

~ $ protractor configs/config.js --suite=everything
