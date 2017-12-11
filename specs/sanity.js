// sanity.js
var ShoppingCart = require('../pages/shopping-cart.js');

var shopper = new ShoppingCart();

describe('Some Sanity tests: ', function() {
  browser.ignoreSynchronization = true;

  it('Verify Url', function() {

    browser.get('/');

    expect(browser.getCurrentUrl()).toBe(browser.baseUrl);

  });

  it('Verify Payment Information Button Exists', function() {

    browser.get('/');

    shopper.waitToBeClickable(shopper.btnPaymentInformation);

    expect(shopper.btnPaymentInformation.isPresent()).toBe(true);

  });

  it('Verify Add To Cart Button Exists', function() {

    browser.get('/');

    shopper.waitToBeClickable(shopper.btnAddToCart.get(0));

    expect(shopper.btnAddToCart.get(0).isPresent()).toBe(true);

  });

});
