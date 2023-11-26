# allo-testing

## Description
This repository includes testing of the https://allo.ua/ua/

### How to run
Swith to branch `dev`


`npm install` - add all necessary dependencies

`npx cypress open` (`npm run cypress:open`) - open Cypress, select e2e testing and choose on of the 4 test (cypress/e2e)

`cypress run --reporter mochawesome` - to run mochawesome for generating test results

`npx mochawesome-merge "cypress/results/*.json" > mochawesome.json` - combine test results

### .env-variables
It's required to create `cypress.env.json` to run tests. 

You can see `cypress.env.example.json` file to get required info, or just rename it to `cypress.env.json`  (it's not recommended to push .env files)

### My own test (4th)
Description:
- Open marketplace url. Verify it.
- Open category and subcategory if it is necessary.
- Add any item to the basket.
- Select another category and add an item from
that category
- Open basket
- Delete products from basket and verify that they were deleted

### Git/GitHub
You could see closed PRs and commits to get more info about development history