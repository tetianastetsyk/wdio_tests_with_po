const { pages } = require('../pages/Pages');
const chai_expect = require('chai').expect;
var _ = require('lodash');

describe('Sorting on Inventory Page', () => {
    beforeEach( async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');
    });

    it ("Verify sorting by name from Z to A", async () => {
        let sortingZA = _.reverse(await pages.inventoryPage.getAllNames());

        await pages.inventoryPage.allDropDownItems[1].click();

        chai_expect(await pages.inventoryPage.getAllNames()).to.have.ordered.members(sortingZA);
    });

    it ("Verify sorting by price from low to high", async () => {
        let sortingPricesLowToHigh = (await pages.inventoryPage.getAllPrices()).sort((a, b) => a - b);

        await pages.inventoryPage.allDropDownItems[2].click();

        chai_expect(await pages.inventoryPage.getAllPrices()).to.have.ordered.members(sortingPricesLowToHigh);
    });

    it ("Verify sorting by price from high to low", async () => {
        let sortingPricesHighToLow = (await pages.inventoryPage.getAllPrices()).sort((a, b) => b - a);

        await pages.inventoryPage.allDropDownItems[3].click();

        chai_expect(await pages.inventoryPage.getAllPrices()).to.have.ordered.members(sortingPricesHighToLow);
    });

    it ("Verify sorting by name from A to Z", async () => {
        let sortingAZ = (await pages.inventoryPage.getAllNames()).sort();

        await pages.inventoryPage.allDropDownItems[0].click();

        chai_expect(await pages.inventoryPage.getAllNames()).to.have.ordered.members(sortingAZ);
    });
});