const { InventoryPage } = require('./Inventory.page');
const { LoginPage } = require('./Login.page');
const { ShopingCartPage } = require('./ShopingCart.page');
const { CheckoutPage } = require('./Checkout.page');

module.exports = {
    pages: {
        loginPage: new LoginPage(),
        inventoryPage: new InventoryPage(),
        shopingCartPage: new ShopingCartPage(),
        checkoutPage: new CheckoutPage(),
    },
};
