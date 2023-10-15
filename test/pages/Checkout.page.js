const { ShopingCartPage } = require('./ShopingCart.page');
const { faker } = require('@faker-js/faker');
var _ = require('lodash');


class CheckoutPage extends ShopingCartPage {
    url = '/checkout-step-one.html';

    get headerTitle() { return $('.title'); }

    get firstNameField() { return $("#first-name"); }

    get lastNameField() { return $('#last-name'); }

    get postalCodeField() { return $('#postal-code'); }

    get continueBtn() { return $('#continue'); }

    get cancelBtn() { return $('#cancel'); }

    get tax() { return $('.summary_tax_label'); }

    get itemTotal() { return $('.summary_subtotal_label'); }

    get total() { return $('.summary_total_label'); }


    createRandomUser() {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const postalCode = faker.location.zipCode();

        return {
          firstName,
          lastName,
          postalCode,
        };
    };

    async stringToNumber(locator, num) {
        return parseFloat((await locator.getText()).slice(num));
    };

    async getPriceInfo() {
        let tax = await this.stringToNumber(this.tax, 6);
        let itemTotal = await this.stringToNumber(this.itemTotal, 13);
        let total = await this.stringToNumber(this.total, 8);

        return {
            tax,
            itemTotal,
            total,
        };
    };

    async calculateItemTotal() {
        return _.sum(await this.getAllItemsPrices());
    };

    async calculateTax() {
        return _.ceil((await this.calculateItemTotal()) * 0.08, 2);
    };

    async calculateTotal() {
        return (await this.calculateTax()) + (await this.calculateItemTotal());
    };
}


module.exports = { CheckoutPage };
