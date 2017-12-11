// shopping-cart.js

var ShoppingCart = function() {
  var EC = protractor.ExpectedConditions;

//// ELEMENTS
  // CATALOG AND SHOPPING CART ELEMENTS
  this.btnPaymentInformation = element(by.id('nav-payment-info'));
  this.rowsCatalogList = element(by.id('item-list')).$$('.nx-item');
  this.btnAddToCart = $$('.sk-action-field');
  this.inpMostRecentQuantity = element.all(by.css('input[inputmode="numeric"]')).get(0);
  // ORDER SUMMARY AND PAYMENT INFORMATION ELEMENTS
  this.tdCartTotalSummary = element(by.id('shopping-cart')).$('.nx-summary').$('.nx-fieldtext');
  this.rowsOrderSummary = $$('.nx-skootable-data').get(2).$$('.nx-list-contents').$$('.nx-item');
  this.inpCardNumber = element(by.css('div[data-uid="55"]')).element(by.css('input'));
  this.inpExpirationDate = element(by.css('div[data-uid="56"]')).element(by.css('input'));
  this.inpSecurityCode = element(by.css('div[data-uid="57"]')).element(by.css('input'));
  this.btnProcessPayment = element(by.id('nav-process-payment'));
  this.btnOrderInformation = element(by.id('nav-order-info'));
  this.errorMessage = $('.nx-error');
  // ORDER TOTAL ELEMENTS
  this.btnNewOrder = element(by.id('nav-start-over'));
  this.orderTotalMessage = element(by.id('sk-PMW9H-549'));
  this.orderTotalDollars = this.orderTotalMessage.$('.nx-field');
  this.rowsItemsPurchasedList = element(by.id('sk-PCSzt-246')).$$('.nx-item');


//// PAGE FUNCTIONS

  /**
  * Adds item by name from Catalog to Shopping Cart
  * Sets quantity for item in Shopping Cart
  * @param {object} value Object with name and qty keys
  */
  this.addItemToCart = function(item) {
   this.rowsCatalogList.each(function(row, index) {
     row.getText().then(function(text) {

       if (text.split('\n').indexOf(item.name) > -1) {
         $$('.sk-action-field').get(index).click();
       }

     });
   });

   this.inpMostRecentQuantity.clear().sendKeys(item.qty);
  };

  /**
  * Sets Card Number, Expiration Date and Security Code inputs
  * @param {object} value Payment object with cardNumber, expirationDate, securityCode keys
  */
  this.setPaymentInfo = function (payment) {
   this.inpCardNumber.sendKeys(payment.creditCard);
   this.inpExpirationDate.sendKeys(payment.expirationDate);
   this.inpSecurityCode.sendKeys(payment.securityCode);
  };

//// HELPER FUNCTIONS
  this.waitForPresence = function(element) {
    browser.wait(EC.presenceOf(element), 6000);
  };

  this.waitToBeClickable = function(element) {
    browser.wait(EC.elementToBeClickable(element), 6000);
  };

};

module.exports = ShoppingCart;
