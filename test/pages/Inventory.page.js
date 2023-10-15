const { BaseSwagLabPage } = require('./BaseSwagLab.page');
var _ = require('lodash');

class InventoryPage extends BaseSwagLabPage {
    url = '/inventory.html';

    get headerTitle() { return $('.title'); }

    get inventoryItems() { return $$('.inventory_item'); }

    get addItemToCartBtns() { return $$('[id^="add-to-cart"]'); }

    get inventoryItemsPrices() { return $$('.inventory_item_price'); }

    get inventoryItemsNames() { return $$('.inventory_item_name'); }

    get inventoryItemsDescriptions() { return $$('.inventory_item_desc'); }

    get allDropDownItems() { return $$('.right_component .select_container .product_sort_container option'); }


    async addItemToCartById(id) {
        await this.addItemToCartBtns[id].click();
    };

    async addRandomItemsToCart() {
        let numOfItems = (await this.addItemToCartBtns).length - 1;
        let randomNum = _.random(numOfItems);
            for(let i = numOfItems; i >= randomNum; i--) {
                await this.addItemToCartById(_.random(i));
            };
    };

    async getAllPrices() {
        let inventoryItemsPricesArray = await this.inventoryItemsPrices.map(el => el.getText());
        let slicedArray = await inventoryItemsPricesArray.map(el => el.slice(1));
        let pricesToNumbersArr = await slicedArray.map(el => parseFloat(el));
        return pricesToNumbersArr;
    };

    async getAllNames() {
        return await this.inventoryItemsNames.map(el => el.getText());
    };

    async getAllDescriptions() {
        return await this.inventoryItemsDescriptions.map(el => el.getText());
    };
}

module.exports = { InventoryPage };
