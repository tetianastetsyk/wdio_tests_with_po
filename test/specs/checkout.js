const { pages } = require('../pages/Pages');
var _ = require('lodash');
const chai_expect = require('chai').expect;

describe('Checkout Page', () => {
    beforeEach( async () => {
        await pages.loginPage.navigate();
        await pages.loginPage.performLogin('standard_user', 'secret_sauce');
    });

    it("Verify calculated Total Price", async () => {
        await pages.inventoryPage.addRandomItemsToCart();

        await pages.inventoryPage.shopingCart.click();
        await pages.shopingCartPage.checkoutBtn.click();

        await pages.checkoutPage.firstNameField.setValue(pages.checkoutPage.createRandomUser().firstName);
        await pages.checkoutPage.lastNameField.setValue(pages.checkoutPage.createRandomUser().lastName);
        await pages.checkoutPage.postalCodeField.setValue(pages.checkoutPage.createRandomUser().postalCode);

        await pages.checkoutPage.continueBtn.click();

        await expect(pages.shopingCartPage.cartItemsNames).toBeDisplayed();
        await expect(pages.shopingCartPage.cartItemsDescriptions).toBeDisplayed();
        await expect(pages.shopingCartPage.cartItemsPrices).toBeDisplayed();

        chai_expect(await pages.checkoutPage.calculateTotal()).to.equal((await pages.checkoutPage.getPriceInfo()).total);
    });
});