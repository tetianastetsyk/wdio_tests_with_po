const { pages } = require('../pages/Pages');
var _ = require('lodash');

describe('Shopping Cart Page', () => {
    beforeEach( async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');
    });

    it ("Verify products are displayed correctly", async () => {
        await pages.inventoryPage.addRandomItemsToCart();

        await pages.inventoryPage.shopingCart.click();

        await expect(pages.shopingCartPage.cartItemsNames).toBeDisplayed();
        await expect(pages.shopingCartPage.cartItemsDescriptions).toBeDisplayed();
        await expect(pages.shopingCartPage.cartItemsPrices).toBeDisplayed();
    });
});