const { BaseSwagLabPage } = require('./BaseSwagLab.page');

class ShopingCartPage extends BaseSwagLabPage {
    url = '/cart.html';

    cartItemSelector = '.cart_item';

    removeItemSelector = '[id^="remove"]';

    get headerTitle() { return $('.title'); }

    get cartItems() { return $$(this.cartItemSelector); }

    get cartItemsNames() { return $$('.inventory_item_name'); }

    get cartItemsDescriptions() { return $$('.inventory_item_desc'); }

    get cartItemsPrices() { return $$('.inventory_item_price'); }

    get continueShoppingBtn() { return $('#continue-shopping'); }

    get checkoutBtn() { return $('#checkout'); }

    // async below added to show the function returns a promise
    async getCartItemByName(name) { return $(`${this.cartItemSelector}=${name}`); }

    async removeCartItemByName(name) {
        const item = await this.getCartItemByName(name);
        return item.$(this.removeItemSelector);
    };

    async removeCartItemById(id) {
        await this.cartItems[id].$(this.removeItemSelector).click();
    };

    async getAllItemsPrices() {
        let cartItemsPricesArray = await this.cartItemsPrices.map(el => el.getText());
        let slicedArray = await cartItemsPricesArray.map(el => el.slice(1));
        let pricesToNumbersArr = await slicedArray.map(el => parseFloat(el));
        return pricesToNumbersArr;
    };

}

module.exports = { ShopingCartPage };
