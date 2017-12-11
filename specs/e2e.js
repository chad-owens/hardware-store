// e2e.js
var ShoppingCart = require('../pages/shopping-cart.js');

var shopper = new ShoppingCart();

describe('Shopping: ', function() {
  browser.ignoreSynchronization = true;

  it('Add Drill, Checkout and Verify Order Total', function() {

    var data = {
      drill: {name:'Drill', qty: '1', price: 100.00},
      payment: {creditCard: '4111111111111111', expirationDate: '0620', securityCode: '123'},
      orderTotal: 100.00
    };

    browser.get('/');

    shopper.waitToBeClickable(shopper.btnAddToCart.get(0));

    shopper.addItemToCart(data.drill);

    shopper.btnPaymentInformation.click();

    shopper.setPaymentInfo(data.payment);

    shopper.btnProcessPayment.click();

    shopper.waitToBeClickable(shopper.btnNewOrder);

    expect(shopper.orderTotalMessage.getText()).toBe('Your total is $' + data.orderTotal.toFixed(2));

  });

  it('Add Drill, Checkout and Verify Items Purchased List', function() {

    var data = {
      drill: {name:'Drill', qty: '1', price: 100.00},
      payment: {creditCard: '4111111111111111', expirationDate: '0620', securityCode: '123'},
      orderTotal: 100.00
    };

    browser.get('/');

    shopper.waitToBeClickable(shopper.btnAddToCart.get(0));

    shopper.addItemToCart(data.drill);

    shopper.btnPaymentInformation.click();

    shopper.setPaymentInfo(data.payment);

    shopper.btnProcessPayment.click();

    shopper.waitToBeClickable(shopper.btnNewOrder);

    // Verify the Items Purchased List
    shopper.rowsItemsPurchasedList.each(function(row) {
      row.getText().then(function(text) {
        var rowArray = text.split('\n');
        var itemObject = rowArray[0].toLowerCase();

        expect(rowArray[0]).toBe(data[itemObject].name);
        expect(rowArray[1]).toBe('$' + data[itemObject].price.toFixed(2));
        expect(rowArray[2]).toBe(data[itemObject].qty);
        expect(rowArray[3]).toBe('$' + (data[itemObject].qty * data[itemObject].price).toFixed(2));
      });
    });

  });

  it('Add Drill, Wrench, Hammer and Verify Order Summary Preview Table', function() {

    var data = {
      drill: {name:'Drill', qty: '1', price: 100.00},
      wrench: {name:'Wrench', qty: '2', price: 15.00},
      hammer: {name:'Hammer', qty: '3', price: 10.00},
      payment: {creditCard: '4111111111111111', expirationDate: '0620', securityCode: '123'},
      orderTotal: 160.00
    };

    browser.get('/');

    shopper.waitToBeClickable(shopper.btnAddToCart.get(0));

    shopper.addItemToCart(data.drill);
    shopper.addItemToCart(data.wrench);
    shopper.addItemToCart(data.hammer);

    shopper.btnPaymentInformation.click();

    shopper.setPaymentInfo(data.payment);

    // Verify the Order Summary Preview Table
    shopper.rowsOrderSummary.each(function(row) {
      row.getText().then(function(text) {
        var rowArray = text.split('\n');
        var itemObject = rowArray[0].toLowerCase();

        expect(rowArray[0]).toBe(data[itemObject].name);
        expect(rowArray[1]).toBe('$' + data[itemObject].price.toFixed(2));
        expect(rowArray[2]).toBe(data[itemObject].qty);
        expect(rowArray[3]).toBe('$' + (data[itemObject].qty * data[itemObject].price).toFixed(2));
      });
    });

    shopper.btnProcessPayment.click();

    shopper.waitToBeClickable(shopper.btnNewOrder);

    expect(shopper.orderTotalMessage.getText()).toBe('Your total is $' + data.orderTotal.toFixed(2));

  });

  it('Add Drill, Checkout and Start Over', function() {

    var data = {
      drill: {name:'Drill', qty: '1'},
      payment: {creditCard: '4111111111111111', expirationDate: '0620', securityCode: '123'}
    };

    browser.get('/');

    shopper.waitToBeClickable(shopper.btnAddToCart.get(0));

    shopper.addItemToCart(data.drill);

    shopper.btnPaymentInformation.click();

    shopper.setPaymentInfo(data.payment);

    shopper.btnProcessPayment.click();

    shopper.waitToBeClickable(shopper.btnNewOrder);

    shopper.btnNewOrder.click();

    shopper.waitToBeClickable(shopper.btnPaymentInformation);

    expect(shopper.tdCartTotalSummary.getText()).toBe('$0.00 (SUM)');

  });

  it('Add Drill, Verify Blank Required Fields and Checkout', function() {

    var data = {
      drill: {name:'Drill', qty: '1'},
      blankPayment: {creditCard: '', expirationDate: '', securityCode: ''},
      payment: {creditCard: '4111111111111111', expirationDate: '0620', securityCode: '123'},
      errorMessage : 'Required Fields have no Value [Card Number], [Expiration Date], [Security Code]'
    };

    browser.get('/');

    shopper.waitToBeClickable(shopper.btnAddToCart.get(0));

    shopper.addItemToCart(data.drill);

    shopper.btnPaymentInformation.click();

    shopper.setPaymentInfo(data.blankPayment);

    shopper.btnProcessPayment.click();

    expect(shopper.errorMessage.getText()).toBe(data.errorMessage);

    shopper.setPaymentInfo(data.payment);

    shopper.btnProcessPayment.click();

    shopper.waitToBeClickable(shopper.btnNewOrder);

    shopper.btnNewOrder.click();

    shopper.waitToBeClickable(shopper.btnPaymentInformation);

    expect(shopper.orderTotalMessage.isPresent()).toBe(true);

  });

});
