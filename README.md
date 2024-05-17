
Cypress Test Suite for Order Placement Process
---------------------------

This repository contains Cypress tests for verifying the order placement process on a Magento e-commerce website. The test suite includes multiple scenarios to ensure the robustness and reliability of the order process.

Installation:

Clone the repository:
-----------------------------
git clone https://github.com/yourusername/order-placement-cypress-tests.git
cd order-placement-cypress-tests

Install dependencies:
------------------------------
Make sure you have Node.js installed, then run:
npm install

Running the Tests
------------------------------
To run the tests, use the following command:
npx cypress open

This will open the Cypress Test Runner, where you can select and run individual tests or the entire test suite.

Test Scenarios
--------------------
The test suite covers the following scenarios:

1. Use Add to Cart Hidden Button
2. View Current Items in Shopping Cart
3. Add a Suggested Item to Shopping Cart
4. Proceed to Checkout
5. Apply a Coupon Code
6. Apply an Invalid Coupon Code
7. Select Shipping Method
8. Place an Order
9. View Placed Order
10. Re-order Item
11. Add Item to Cart from Wishlist
12. Leave a Review for an Item
